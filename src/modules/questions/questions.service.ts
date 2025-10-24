import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './schemas/question.schema';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}

  // Lấy danh sách câu hỏi
  async findAllQuestions() {
    return this.questionModel
      .find({ statusDelete: false })
      .populate('user', 'name email role')
      .populate('department', 'name')
      .populate('field', 'name')
      .sort({ createdAt: -1 })
      .exec();
  }

  // Xem chi tiết câu hỏi
  async findQuestionById(id: string) {
    return this.questionModel
      .findById(id)
      .populate('user', 'name email role')
      .populate('department', 'name')
      .populate('field', 'name')
      .exec();
  }

  // Xóa câu hỏi (soft delete)
  async deleteQuestion(id: string) {
    return this.questionModel.findByIdAndUpdate(
      id,
      { statusDelete: true },
      { new: true },
    );
  }
}
