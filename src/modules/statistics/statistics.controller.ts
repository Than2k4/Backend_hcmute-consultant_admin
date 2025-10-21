import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { DataResponse, ExceptionResponse } from 'src/common/response';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  // ✅ Tổng quan (Overview)
  @UseGuards(AdminGuard)
  @Get('overview')
  async getOverviewStatistics() {
    try {
      const data = await this.statisticsService.getOverviewStatistics();
      return new DataResponse(200, 'Thống kê tổng quan hệ thống thành công', data);
    } catch (error) {
      console.error('Error in getOverviewStatistics:', error);
      return new ExceptionResponse(500, 'Lỗi khi thống kê tổng quan');
    }
  }

  // ✅ Thống kê câu hỏi
  @UseGuards(AdminGuard)
  @Get('questions')
  async getQuestionStatistics() {
    try {
      const data = await this.statisticsService.getQuestionStatistics();
      return new DataResponse(200, 'Thống kê câu hỏi hệ thống thành công', data);
    } catch (error) {
      console.error('Error in getQuestionStatistics:', error);
      return new ExceptionResponse(500, 'Lỗi khi thống kê câu hỏi');
    }
  }

  // ✅ Thống kê câu trả lời
  @UseGuards(AdminGuard)
  @Get('answers')
  async getAnswerStatistics() {
    try {
      const data = await this.statisticsService.getAnswerStatistics();
      return new DataResponse(200, 'Thống kê câu trả lời hệ thống thành công', data);
    } catch (error) {
      console.error('Error in getAnswerStatistics:', error);
      return new ExceptionResponse(500, 'Lỗi khi thống kê câu trả lời');
    }
  }
}
