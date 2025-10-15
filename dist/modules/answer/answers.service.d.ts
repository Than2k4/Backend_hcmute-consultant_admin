import { Model } from 'mongoose';
import { Answer } from './schemas/answer.schema';
export declare class AnswersService {
    private readonly answerModel;
    constructor(answerModel: Model<Answer>);
    findAllAnswers(): Promise<(import("mongoose").Document<unknown, {}, Answer, {}, {}> & Answer & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findAnswerById(id: string): Promise<import("mongoose").Document<unknown, {}, Answer, {}, {}> & Answer & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    deleteAnswer(id: string): Promise<import("mongoose").Document<unknown, {}, Answer, {}, {}> & Answer & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
