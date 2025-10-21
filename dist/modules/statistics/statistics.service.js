"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/schemas/user.schema");
const question_schema_1 = require("../questions/schemas/question.schema");
const answer_schema_1 = require("../answer/schemas/answer.schema");
const post_schema_1 = require("../posts/schemas/post.schema");
const field_schema_1 = require("../departments/schemas/field.schema");
const department_schema_1 = require("../departments/schemas/department.schema");
let StatisticsService = class StatisticsService {
    constructor(userModel, questionModel, answerModel, postModel, fieldModel, departmentModel) {
        this.userModel = userModel;
        this.questionModel = questionModel;
        this.answerModel = answerModel;
        this.postModel = postModel;
        this.fieldModel = fieldModel;
        this.departmentModel = departmentModel;
    }
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
    async getAnswerStatistics() {
        var _a, _b, _c;
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
            totalAnswers: ((_a = data.totalAnswers[0]) === null || _a === void 0 ? void 0 : _a.count) || 0,
            approvedAnswers: ((_b = data.approvedAnswers[0]) === null || _b === void 0 ? void 0 : _b.count) || 0,
            notApprovedAnswers: ((_c = data.notApprovedAnswers[0]) === null || _c === void 0 ? void 0 : _c.count) || 0,
            avgResponseTime: data.avgResponseTime[0]
                ? Math.round(data.avgResponseTime[0].avgResponse / 1000 / 60)
                : 0,
            topConsultants: data.topConsultants || [],
        };
    }
};
exports.StatisticsService = StatisticsService;
exports.StatisticsService = StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(question_schema_1.Question.name)),
    __param(2, (0, mongoose_1.InjectModel)(answer_schema_1.Answer.name)),
    __param(3, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __param(4, (0, mongoose_1.InjectModel)(field_schema_1.Field.name)),
    __param(5, (0, mongoose_1.InjectModel)(department_schema_1.Department.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], StatisticsService);
//# sourceMappingURL=statistics.service.js.map