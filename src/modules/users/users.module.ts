import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt'; // 👈 Thêm dòng này
import { AdminGuard } from '../../common/guards/admin.guard'; // 👈 Đảm bảo đường dẫn đúng
import { Department, DepartmentSchema } from '../departments/schemas/department.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
      , { name: Department.name, schema: DepartmentSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_secret_key', // 👈 Thêm cấu hình này
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AdminGuard], // 👈 Đăng ký guard tại đây
  exports: [MongooseModule, UserService],
})
export class UsersModule {}
