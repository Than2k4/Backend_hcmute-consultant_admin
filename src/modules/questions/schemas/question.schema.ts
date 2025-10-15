import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Question extends Document {
  @Prop({ required: true, maxlength: 255 })
  title: string;

  @Prop({ required: true, maxlength: 900 })
  content: string;

  @Prop({ maxlength: 500 })
  fileUrl?: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Department', required: true })
  department: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Field', required: true })
  field: Types.ObjectId;

  @Prop({ required: true, enum: ['SINHVIEN', 'GIANGVIEN', 'NHANVIEN', 'USER'] })
  roleAsk: string;

  @Prop({ type: Types.ObjectId, ref: 'Question' })
  parentQuestion?: Types.ObjectId;

  @Prop({ default: 0 })
  views: number;

  @Prop({ default: false })
  statusApproval: boolean;

  @Prop({ default: false })
  statusAnswer: boolean;

  @Prop({ default: true })
  statusPublic: boolean;

  @Prop({ default: false })
  statusDelete: boolean;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
