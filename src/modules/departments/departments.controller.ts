import { Controller, Get, UseGuards } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { DataResponse, ExceptionResponse } from '../../common/response';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @UseGuards(AdminGuard)
  @Get()
  async getAllDepartments() {
    try {
      const data = await this.departmentsService.findAllDepartmentsWithFields();
      return new DataResponse(200, 'Lấy danh sách khoa và lĩnh vực thành công', data);
    } catch (error) {
      console.error(error);
      return new ExceptionResponse(500, 'Lỗi khi lấy danh sách khoa');
    }
  }
}
