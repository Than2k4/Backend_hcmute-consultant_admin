import { Document, Types } from 'mongoose';
export type FieldDocument = Field & Document;
export declare class Field {
    name: string;
    department: Types.ObjectId;
}
export declare const FieldSchema: import("mongoose").Schema<Field, import("mongoose").Model<Field, any, any, any, Document<unknown, any, Field, any, {}> & Field & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Field, Document<unknown, {}, import("mongoose").FlatRecord<Field>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Field> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
