import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Answer extends Document {
  @Prop({ maxlength: 255 })
  title?: string;

  @Prop({ required: true, maxlength: 255 })
  content: string;

  @Prop({ maxlength: 255 })
  file?: string;

  @Prop({ type: Types.ObjectId, ref: 'Question', required: true })
  question: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true, enum: ['GIANGVIEN', 'SINHVIEN'] })
  roleConsultant: string;

  @Prop({ default: false })
  statusApproval: boolean;

  @Prop({ default: true })
  statusAnswer: boolean;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
