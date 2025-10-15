import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostsService {
  deletePost(id: string) {
      throw new Error('Method not implemented.');
  }
  updatePost(id: string, body: any) {
      throw new Error('Method not implemented.');
  }
  createPost(body: any, userId: any) {
      throw new Error('Method not implemented.');
  }
  constructor(@InjectModel(Post.name) private readonly postModel: Model<Post>) {}

  // ✅ Lấy danh sách bài viết (có populate user)
  async findAll(): Promise<any[]> {
    return this.postModel.find().populate('user', 'username email').sort({ createdAt: -1 }).lean();
  }

  // ✅ Lấy bài viết theo ID
  async findById(id: string): Promise<any | null> {
    return this.postModel.findById(id).populate('user', 'username email').lean();
  }

  // ✅ Tạo mới bài viết
  async create(postData: any, userId: string): Promise<Post> {
    const newPost = new this.postModel({
      ...postData,
      user: new Types.ObjectId(userId),
    });
    return newPost.save();
  }

  // ✅ Cập nhật bài viết
  async update(id: string, updateData: any): Promise<Post | null> {
    return this.postModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  // ✅ Xóa bài viết
  async delete(id: string): Promise<Post | null> {
    return this.postModel.findByIdAndDelete(id);
  }
}
