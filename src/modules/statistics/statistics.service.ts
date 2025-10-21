import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { Question } from '../questions/schemas/question.schema';
import { Answer } from '../answer/schemas/answer.schema';
import { Post } from '../posts/schemas/post.schema';
import { Field } from '../departments/schemas/field.schema';
import { Department } from '../departments/schemas/department.schema';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Question.name) private readonly questionModel: Model<Question>,
    @InjectModel(Answer.name) private readonly answerModel: Model<Answer>,
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    @InjectModel(Field.name) private readonly fieldModel: Model<Field>,
    @InjectModel(Department.name) private readonly departmentModel: Model<Department>,
  ) { }

  // === ✅ THỐNG KÊ TỔNG QUAN CHO TOÀN HỆ THỐNG ===
  async getOverviewStatistics() {
    const totalUsers = await this.userModel.countDocuments({ role: 'USER' });
    const totalConsultants = await this.userModel.countDocuments({ role: 'TUVANVIEN' });
    const totalLeaders = await this.userModel.countDocuments({ role: 'TRUONGBANTUVAN' });
    const totalQuestions = await this.questionModel.countDocuments({ statusDelete: { $ne: true } });
    const totalAnswers = await this.answerModel.countDocuments();
    const unansweredQuestions = await this.questionModel.countDocuments({
      statusAnswer: false,
      statusDelete: { $ne: true },
    });
    const totalPosts = await this.postModel.countDocuments();
    const totalFields = await this.fieldModel.countDocuments();
    const totalDepartments = await this.departmentModel.countDocuments();

    const answeredRate = totalQuestions > 0 ? (totalAnswers / totalQuestions) * 100 : 0;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const questionsThisMonth = await this.questionModel.countDocuments({
      statusDelete: { $ne: true },
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });

    return {
      totalUsers,
      totalConsultants,
      totalLeaders,
      totalQuestions,
      totalAnswers,
      unansweredQuestions,
      totalPosts,
      totalFields,
      totalDepartments,
      answeredRate: answeredRate.toFixed(2),
      questionsThisMonth,
    };
  }

  // === ✅ THỐNG KÊ CÂU HỎI CHUNG CHO TOÀN HỆ THỐNG ===
  async getQuestionStatistics() {
    const totalQuestions = await this.questionModel.countDocuments({ statusDelete: { $ne: true } });
    const answered = await this.questionModel.countDocuments({
      statusAnswer: true,
      statusDelete: { $ne: true },
    });
    const notAnswered = await this.questionModel.countDocuments({
      statusAnswer: false,
      statusDelete: { $ne: true },
    });
    const pendingApproval = await this.questionModel.countDocuments({
      statusApproval: false,
      statusDelete: { $ne: true },
    });

    const questionsByMonth = await this.questionModel.aggregate([
      { $match: { statusDelete: { $ne: true } } },
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          total: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    const topFields = await this.questionModel.aggregate([
      { $match: { statusDelete: { $ne: true } } },
      { $group: { _id: '$field', total: { $sum: 1 } } },
      { $sort: { total: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'fields',
          localField: '_id',
          foreignField: '_id',
          as: 'fieldInfo',
        },
      },
      { $unwind: { path: '$fieldInfo', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 0,
          fieldId: '$fieldInfo._id',
          fieldName: '$fieldInfo.name',
          total: 1,
        },
      },
    ]);

    const questionsByYear = await this.questionModel.aggregate([
      { $match: { statusDelete: { $ne: true } } },
      {
        $group: {
          _id: { year: { $year: '$createdAt' } },
          total: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1 } },
    ]);

    return {
      totalQuestions,
      byStatus: { answered, notAnswered, pendingApproval },
      questionsByMonth,
      topFields,
      questionsByYear,
    };
  }

  // === ✅ THỐNG KÊ CÂU TRẢ LỜI CHUNG CHO TOÀN HỆ THỐNG ===
  async getAnswerStatistics() {
    const stats = await this.answerModel.aggregate([
      {
        $lookup: {
          from: 'questions',
          localField: 'question',
          foreignField: '_id',
          as: 'questionData',
        },
      },
      { $unwind: '$questionData' },
      {
        $facet: {
          totalAnswers: [{ $count: 'count' }],
          approvedAnswers: [{ $match: { statusApproval: true } }, { $count: 'count' }],
          notApprovedAnswers: [{ $match: { statusApproval: false } }, { $count: 'count' }],
          avgResponseTime: [
            {
              $project: {
                responseTime: { $subtract: ['$createdAt', '$questionData.createdAt'] },
              },
            },
            {
              $group: {
                _id: null,
                avgResponse: { $avg: '$responseTime' },
              },
            },
          ],
          topConsultants: [
            {
              $group: {
                _id: '$user',
                total: { $sum: 1 },
              },
            },
            { $sort: { total: -1 } },
            { $limit: 5 },
            {
              $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'user',
              },
            },
            { $unwind: '$user' },
          ]

        },
      },
    ]);

    const data = stats[0] || {};
    return {
      totalAnswers: data.totalAnswers[0]?.count || 0,
      approvedAnswers: data.approvedAnswers[0]?.count || 0,
      notApprovedAnswers: data.notApprovedAnswers[0]?.count || 0,
      avgResponseTime: data.avgResponseTime[0]
        ? Math.round(data.avgResponseTime[0].avgResponse / 1000 / 60)
        : 0,
      topConsultants: data.topConsultants || [],
    };
  }
}
