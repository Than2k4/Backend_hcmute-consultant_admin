import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Department } from '../departments/schemas/department.schema';
export declare class UserService {
    private readonly userModel;
    private readonly departmentModel;
    constructor(userModel: Model<User>, departmentModel: Model<Department>);
    addConsultant(data: any, adminUser: UserDocument): Promise<Partial<User>>;
    findAll(): Promise<Partial<User>[]>;
    findById(id: string): Promise<Partial<User> | null>;
    softDelete(id: string): Promise<User | null>;
}
