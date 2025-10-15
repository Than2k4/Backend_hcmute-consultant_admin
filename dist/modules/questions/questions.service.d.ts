import { Model } from 'mongoose';
import { Question } from './schemas/question.schema';
export declare class QuestionsService {
    private questionModel;
    constructor(questionModel: Model<Question>);
    findAllQuestions(): Promise<(import("mongoose").Document<unknown, {}, Question, {}, {}> & Question & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findQuestionById(id: string): Promise<import("mongoose").Document<unknown, {}, Question, {}, {}> & Question & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteQuestion(id: string): Promise<import("mongoose").Document<unknown, {}, Question, {}, {}> & Question & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
