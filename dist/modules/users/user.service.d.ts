import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    findAll(): Promise<Partial<User>[]>;
    findById(id: string): Promise<Partial<User> | null>;
    softDelete(id: string): Promise<User | null>;
}
