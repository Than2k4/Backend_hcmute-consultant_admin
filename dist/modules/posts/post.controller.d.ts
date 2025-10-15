import { PostsService } from './post.service';
import { DataResponse, ExceptionResponse } from '../../common/response';
import { Request } from 'express';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(body: any, req: Request): Promise<DataResponse | ExceptionResponse>;
    getAll(): Promise<DataResponse | ExceptionResponse>;
    getById(id: string): Promise<DataResponse | ExceptionResponse>;
    update(id: string, body: any): Promise<DataResponse | ExceptionResponse>;
    delete(id: string): Promise<DataResponse | ExceptionResponse>;
}
