import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
export declare class PostsService {
    private readonly postModel;
    constructor(postModel: Model<Post>);
    findAll(): Promise<any[]>;
    findById(id: string): Promise<any | null>;
    delete(id: string): Promise<Post | null>;
}
