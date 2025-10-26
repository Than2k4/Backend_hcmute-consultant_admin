import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { Department } from '../departments/schemas/department.schema';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Department.name) private readonly departmentModel: Model<Department>,) { }

  async addConsultant(data: any, adminUser: UserDocument): Promise<Partial<User>> {
    // Kiểm tra quyền
    if (adminUser.role !== 'ADMIN') {
      throw new ForbiddenException('Chỉ ADMIN mới được thêm tư vấn viên');
    }

    // Kiểm tra email tồn tại
    const existed = await this.userModel.findOne({ email: data.email });
    if (existed) {
      throw new BadRequestException('❌ Email đã tồn tại');
    }

    if (data.phone) {
    const existedPhone = await this.userModel.findOne({ phone: data.phone });
    if (existedPhone) {
      throw new BadRequestException('❌ Số điện thoại đã tồn tại');
    }
  }
  
    // Kiểm tra thông tin department
    if (!data.department) {
      throw new BadRequestException('❌ Vui lòng nhập ID hoặc tên khoa (department)');
    }

    // Kiểm tra department tồn tại
    const departmentExists = await this.departmentModel.findById(data.department);
    if (!departmentExists) {
      throw new BadRequestException('Khoa không tồn tại');
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Tạo tư vấn viên
    const consultant = await this.userModel.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.email,
      phone: data.phone || null,
      password: hashedPassword,
      role: 'TUVANVIEN',
      department: departmentExists._id, // 👈 đảm bảo ObjectId hợp lệ
      isVerified: true,
      provider: 'local',
    });

    // Loại bỏ thông tin nhạy cảm
    const result = consultant.toObject();
    delete result.password;
    delete result.refreshToken;
    delete result.__v;

    return result;
  }
  // ✅ Lấy tất cả người dùng (ẩn thông tin nhạy cảm)
  async findAll(): Promise<Partial<User>[]> {
    return this.userModel
      .find() // chỉ lấy user chưa bị xóa
      .select('-password -refreshToken -verifyCodeAttemptCount -__v')
      .lean();
  }

  // ✅ Lấy chi tiết 1 người dùng theo id
  async findById(id: string): Promise<Partial<User> | null> {
    return this.userModel
      .findById(id)
      .select('-password -refreshToken -verifyCodeAttemptCount -__v')
      .lean();
  }

  // ✅ Xóa người dùng
  async softDelete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id);
  }
}
