import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
export declare class PostsService {
    private readonly postModel;
    deletePost(id: string): void;
    updatePost(id: string, body: any): void;
    createPost(body: any, userId: any): void;
    constructor(postModel: Model<Post>);
    findAll(): Promise<any[]>;
    findById(id: string): Promise<any | null>;
    create(postData: any, userId: string): Promise<Post>;
    update(id: string, updateData: any): Promise<Post | null>;
    delete(id: string): Promise<Post | null>;
}
