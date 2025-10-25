import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from './schemas/answer.schema';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer.name) private readonly answerModel: Model<Answer>,
  ) {}

  // ✅ Lấy danh sách tất cả câu trả lời
  async findAllAnswers() {
    return this.answerModel
      .find()
      .populate('user', 'username email role')
      .populate('question', 'title')
      .sort({ createdAt: -1 })
      .exec();
  }

  // ✅ Xem chi tiết 1 câu trả lời
  async findAnswerById(id: string) {
    return this.answerModel
      .findById(id)
      .populate('user', 'name email role')
      .populate('question', 'title content')
      .exec();
  }

  // ✅ Xóa (soft delete: chuyển statusAnswer = false)
  async deleteAnswer(id: string) {
    return this.answerModel.findByIdAndUpdate(
      id,
      { statusAnswer: false },
      { new: true },
    );
  }
}
