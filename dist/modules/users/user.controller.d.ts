import { UserService } from './user.service';
import { DataResponse, ExceptionResponse } from '../../common/response';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUsers(): Promise<DataResponse | ExceptionResponse>;
    getUserById(id: string): Promise<DataResponse | ExceptionResponse>;
    deleteUser(id: string): Promise<DataResponse | ExceptionResponse>;
}
