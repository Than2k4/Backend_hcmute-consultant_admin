import { Document, Types } from 'mongoose';
export declare class Answer extends Document {
    title?: string;
    content: string;
    file?: string;
    question: Types.ObjectId;
    user: Types.ObjectId;
    roleConsultant: string;
    statusApproval: boolean;
    statusAnswer: boolean;
}
export declare const AnswerSchema: import("mongoose").Schema<Answer, import("mongoose").Model<Answer, any, any, any, Document<unknown, any, Answer, any, {}> & Answer & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Answer, Document<unknown, {}, import("mongoose").FlatRecord<Answer>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Answer> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
