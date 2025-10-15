import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { DataResponse, ExceptionResponse } from '../../common/response';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @UseGuards(AdminGuard)
  @Get()
  async getAllAnswers() {
    try {
      const data = await this.answersService.findAllAnswers();
      return new DataResponse(200, 'Lấy danh sách câu trả lời thành công', data);
    } catch (error) {
      return new ExceptionResponse(500, 'Lỗi khi lấy danh sách câu trả lời');
    }
  }

  @UseGuards(AdminGuard)
  @Get(':id')
  async getAnswerDetail(@Param('id') id: string) {
    try {
      const data = await this.answersService.findAnswerById(id);
      if (!data) {
        return new ExceptionResponse(404, 'Không tìm thấy câu trả lời');
      }
      return new DataResponse(200, 'Lấy chi tiết câu trả lời thành công', data);
    } catch (error) {
      return new ExceptionResponse(500, 'Lỗi khi lấy chi tiết câu trả lời');
    }
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteAnswer(@Param('id') id: string) {
    try {
      const deleted = await this.answersService.deleteAnswer(id);
      if (!deleted) {
        return new ExceptionResponse(404, 'Không tìm thấy câu trả lời để xóa');
      }
      return new DataResponse(200, 'Xóa câu trả lời thành công', deleted);
    } catch (error) {
      return new ExceptionResponse(500, 'Lỗi khi xóa câu trả lời');
    }
  }
}
