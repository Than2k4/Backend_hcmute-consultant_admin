import { Document, Types } from 'mongoose';
export declare class Question extends Document {
    title: string;
    content: string;
    fileUrl?: string;
    user: Types.ObjectId;
    department: Types.ObjectId;
    field: Types.ObjectId;
    roleAsk: string;
    parentQuestion?: Types.ObjectId;
    views: number;
    statusApproval: boolean;
    statusAnswer: boolean;
    statusPublic: boolean;
    statusDelete: boolean;
}
export declare const QuestionSchema: import("mongoose").Schema<Question, import("mongoose").Model<Question, any, any, any, Document<unknown, any, Question, any, {}> & Question & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Question, Document<unknown, {}, import("mongoose").FlatRecord<Question>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Question> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
