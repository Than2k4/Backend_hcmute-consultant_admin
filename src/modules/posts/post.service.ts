import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private readonly postModel: Model<Post>) {}

  // ✅ Lấy danh sách bài viết (có populate user)
  async findAll(): Promise<any[]> {
    return this.postModel.find().populate('user', 'username email').sort({ createdAt: -1 }).lean();
  }

  // ✅ Lấy bài viết theo ID
  async findById(id: string): Promise<any | null> {
    return this.postModel.findById(id).populate('user', 'username email').lean();
  }

  // ✅ Xóa bài viết
  async delete(id: string): Promise<Post | null> {
    return this.postModel.findByIdAndDelete(id);
  }
}
