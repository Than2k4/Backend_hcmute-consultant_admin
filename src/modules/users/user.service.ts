import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  // ✅ Lấy tất cả người dùng (ẩn thông tin nhạy cảm)
  async findAll(): Promise<Partial<User>[]> {
    return this.userModel
      .find() // chỉ lấy user chưa bị xóa
      .select('-password -refreshToken -verifyCodeAttemptCount -__v')
      .lean();
  }

  // ✅ Lấy chi tiết 1 người dùng theo id
  async findById(id: string): Promise<Partial<User> | null> {
    return this.userModel
      .findById(id)
      .select('-password -refreshToken -verifyCodeAttemptCount -__v')
      .lean();
  }

  // ✅ Xóa mềm người dùng (soft delete)
  async softDelete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(
      id,
      { statusDelete: true },
      { new: true },
    );
  }
}
