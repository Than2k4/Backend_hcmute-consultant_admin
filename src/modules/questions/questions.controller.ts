import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { DataResponse, ExceptionResponse } from 'src/common/response';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  // 🟢 Lấy danh sách câu hỏi
  @UseGuards(AdminGuard)
  @Get()
  async getAllQuestions() {
    try {
      const data = await this.questionsService.findAllQuestions();
      return new DataResponse(200, 'Lấy danh sách câu hỏi thành công', data);
    } catch (error) {
      console.error(error);
      return new ExceptionResponse(500, 'Lỗi khi lấy danh sách câu hỏi');
    }
  }

  // 🟢 Xem chi tiết 1 câu hỏi
  @UseGuards(AdminGuard)
  @Get(':id')
  async getQuestionById(@Param('id') id: string) {
    try {
      const data = await this.questionsService.findQuestionById(id);
      if (!data) {
        return new ExceptionResponse(404, 'Không tìm thấy câu hỏi');
      }
      return new DataResponse(200, 'Lấy chi tiết câu hỏi thành công', data);
    } catch (error) {
      console.error(error);
      return new ExceptionResponse(500, 'Lỗi khi lấy chi tiết câu hỏi');
    }
  }

  // 🟢 Xóa câu hỏi (soft delete)
  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteQuestion(@Param('id') id: string) {
    try {
      const data = await this.questionsService.deleteQuestion(id);
      if (!data) {
        return new ExceptionResponse(404, 'Không tìm thấy câu hỏi để xóa');
      }
      return new DataResponse(200, 'Xóa câu hỏi thành công', data);
    } catch (error) {
      console.error(error);
      return new ExceptionResponse(500, 'Lỗi khi xóa câu hỏi');
    }
  }
}
