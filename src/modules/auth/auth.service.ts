import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';
import { DataResponse, ExceptionResponse } from '../../common/response';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user || user.role !== 'ADMIN') {
      return new ExceptionResponse(403, 'Không có quyền truy cập admin');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new ExceptionResponse(401, 'Sai mật khẩu');
    }

    const payload = { sub: user._id, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    user.refreshToken = refreshToken;
    await user.save();

    return new DataResponse(200, 'Đăng nhập thành công', {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  }
}
