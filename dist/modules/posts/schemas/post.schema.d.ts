import { Document, Types } from 'mongoose';
export declare class Post extends Document {
    title: string;
    content: string;
    imageUrl?: string;
    fileUrl?: string;
    user: Types.ObjectId;
    createdAt: Date;
}
export declare const PostSchema: import("mongoose").Schema<Post, import("mongoose").Model<Post, any, any, any, Document<unknown, any, Post, any, {}> & Post & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Post, Document<unknown, {}, import("mongoose").FlatRecord<Post>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Post> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
