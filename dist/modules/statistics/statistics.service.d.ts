import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { Question } from '../questions/schemas/question.schema';
import { Answer } from '../answer/schemas/answer.schema';
import { Post } from '../posts/schemas/post.schema';
import { Field } from '../departments/schemas/field.schema';
import { Department } from '../departments/schemas/department.schema';
export declare class StatisticsService {
    private readonly userModel;
    private readonly questionModel;
    private readonly answerModel;
    private readonly postModel;
    private readonly fieldModel;
    private readonly departmentModel;
    constructor(userModel: Model<User>, questionModel: Model<Question>, answerModel: Model<Answer>, postModel: Model<Post>, fieldModel: Model<Field>, departmentModel: Model<Department>);
    getOverviewStatistics(): Promise<{
        totalUsers: number;
        totalConsultants: number;
        totalLeaders: number;
        totalQuestions: number;
        totalAnswers: number;
        unansweredQuestions: number;
        totalPosts: number;
        totalFields: number;
        totalDepartments: number;
        answeredRate: string;
        questionsThisMonth: number;
    }>;
    getQuestionStatistics(): Promise<{
        totalQuestions: number;
        byStatus: {
            answered: number;
            notAnswered: number;
            pendingApproval: number;
        };
        questionsByMonth: any[];
        topFields: any[];
        questionsByYear: any[];
    }>;
    getAnswerStatistics(): Promise<{
        totalAnswers: any;
        approvedAnswers: any;
        notApprovedAnswers: any;
        avgResponseTime: number;
        topConsultants: any;
    }>;
}
