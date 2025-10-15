import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Department } from './department.schema';

export type FieldDocument = Field & Document;

@Schema({ timestamps: true })
export class Field {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: Department.name, required: true })
  department: Types.ObjectId;
}

export const FieldSchema = SchemaFactory.createForClass(Field);
