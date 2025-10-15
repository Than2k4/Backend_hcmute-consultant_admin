import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { DataResponse, ExceptionResponse } from '../../common/response';
export declare class AuthService {
    private userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    login(email: string, password: string): Promise<ExceptionResponse | DataResponse>;
}
