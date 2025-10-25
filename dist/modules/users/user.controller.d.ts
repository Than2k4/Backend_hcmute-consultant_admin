import { UserService } from './user.service';
import { DataResponse, ExceptionResponse } from '../../common/response';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<ExceptionResponse | DataResponse>;
    getUserById(id: string): Promise<ExceptionResponse | DataResponse>;
    deleteUser(id: string): Promise<ExceptionResponse | DataResponse>;
}
