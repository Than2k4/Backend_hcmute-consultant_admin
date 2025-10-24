import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { DataResponse, ExceptionResponse } from '../../common/response';
import { AdminGuard } from '../../common/guards/admin.guard'; // Kiểm tra token & role ADMIN

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // ✅ Lấy tất cả người dùng
  @UseGuards(AdminGuard)
  @Get()
  async getAllUsers() {
    try {
      const users = await this.userService.findAll();
      return new DataResponse(200, 'Lấy danh sách người dùng thành công', users);
    } catch (error) {
      return new ExceptionResponse(
        500,
        'Lỗi khi lấy danh sách người dùng',
        error.message,
      );
    }
  }

  // ✅ Xem chi tiết 1 người dùng
  @UseGuards(AdminGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      const user = await this.userService.findById(id);
      if (!user) {
        return new ExceptionResponse(404, 'Không tìm thấy người dùng');
      }
      return new DataResponse(200, 'Lấy thông tin người dùng thành công', user);
    } catch (error) {
      return new ExceptionResponse(
        500,
        'Lỗi khi lấy thông tin người dùng',
        error.message,
      );
    }
  }

  // ✅ Xóa vĩnh viễn người dùng
  @UseGuards(AdminGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    try {
      const deletedUser = await this.userService.softDelete(id);
      if (!deletedUser) {
        return new ExceptionResponse(404, 'Không tìm thấy người dùng để xóa');
      }
      return new DataResponse(200, 'Xóa người dùng vĩnh viễn thành công', deletedUser);
    } catch (error) {
      return new ExceptionResponse(
        500,
        'Lỗi khi xóa người dùng',
        error.message,
      );
    }
  }
}
