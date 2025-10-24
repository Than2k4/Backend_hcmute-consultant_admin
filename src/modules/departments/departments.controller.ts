import {
  Controller,
  Get,
  Param,
  Delete,
  Patch,
  Body,
  UseGuards,
} from '@nestjs/common';
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

  // Xem chi tiết department
  @UseGuards(AdminGuard)
  @Get(':id')
  async getDepartmentById(@Param('id') id: string) {
    try {
      const data = await this.departmentsService.findDepartmentById(id);
      if (!data) return new ExceptionResponse(404, 'Không tìm thấy khoa');
      return new DataResponse(200, 'Lấy chi tiết khoa thành công', data);
    } catch (error) {
      console.error(error);
      return new ExceptionResponse(500, 'Lỗi khi lấy chi tiết khoa');
    }
  }

  // Chỉnh sửa department
  @UseGuards(AdminGuard)
  @Patch(':id')
  async updateDepartment(@Param('id') id: string, @Body() updateData: any) {
    try {
      const data = await this.departmentsService.updateDepartment(id, updateData);
      return new DataResponse(200, 'Cập nhật khoa thành công', data);
    } catch (error) {
      console.error(error);
      return new ExceptionResponse(500, 'Lỗi khi cập nhật khoa');
    }
  }

  // Xóa department
  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteDepartment(@Param('id') id: string) {
    try {
      await this.departmentsService.deleteDepartment(id);
      return new DataResponse(200, 'Xóa khoa thành công', null);
    } catch (error) {
      console.error(error);
      return new ExceptionResponse(500, 'Lỗi khi xóa khoa');
    }
  }

  // Xem chi tiết field
  @UseGuards(AdminGuard)
  @Get('field/:id')
  async getFieldById(@Param('id') id: string) {
    try {
      const data = await this.departmentsService.findFieldById(id);
      if (!data) return new ExceptionResponse(404, 'Không tìm thấy lĩnh vực');
      return new DataResponse(200, 'Lấy chi tiết lĩnh vực thành công', data);
    } catch (error) {
      console.error(error);
      return new ExceptionResponse(500, 'Lỗi khi lấy chi tiết lĩnh vực');
    }
  }

  // Chỉnh sửa field
  @UseGuards(AdminGuard)
  @Patch('field/:id')
  async updateField(@Param('id') id: string, @Body() updateData: any) {
    try {
      const data = await this.departmentsService.updateField(id, updateData);
      return new DataResponse(200, 'Cập nhật lĩnh vực thành công', data);
    } catch (error) {
      console.error(error);
      return new ExceptionResponse(500, 'Lỗi khi cập nhật lĩnh vực');
    }
  }

  // Xóa field
  @UseGuards(AdminGuard)
  @Delete('field/:id')
  async deleteField(@Param('id') id: string) {
    try {
      await this.departmentsService.deleteField(id);
      return new DataResponse(200, 'Xóa lĩnh vực thành công', null);
    } catch (error) {
      console.error(error);
      return new ExceptionResponse(500, 'Lỗi khi xóa lĩnh vực');
    }
  }
}
