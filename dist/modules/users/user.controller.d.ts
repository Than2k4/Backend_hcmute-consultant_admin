import { UserService } from './user.service';
import { DataResponse, ExceptionResponse } from '../../common/response';
import { Request } from 'express';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    addConsultant(body: any, req: Request, res: Response): Promise<any>;
    getAllUsers(): Promise<DataResponse | ExceptionResponse>;
    getUserById(id: string): Promise<DataResponse | ExceptionResponse>;
    deleteUser(id: string): Promise<DataResponse | ExceptionResponse>;
}
