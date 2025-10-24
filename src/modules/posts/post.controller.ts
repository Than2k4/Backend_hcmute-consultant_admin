import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './post.service';
import { DataResponse, ExceptionResponse } from '../../common/response';
import { AdminGuard } from '../../common/guards/admin.guard'; // hoặc guard bạn có sẵn
import { Request } from 'express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAll() {
    try {
      const posts = await this.postsService.findAll();
      return new DataResponse(200, 'Lấy danh sách bài viết thành công', posts);
    } catch (error) {
      return new ExceptionResponse(500, 'Lỗi khi lấy danh sách bài viết', error.message);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const post = await this.postsService.findById(id);
      return new DataResponse(200, 'Lấy bài viết thành công', post);
    } catch (error) {
      return new ExceptionResponse(404, 'Không tìm thấy bài viết', error.message);
    }
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.postsService.delete(id);
      return new DataResponse(200, 'Xóa bài viết thành công', null);
    } catch (error) {
      return new ExceptionResponse(404, 'Không tìm thấy bài viết để xóa', error.message);
    }
  }
}
