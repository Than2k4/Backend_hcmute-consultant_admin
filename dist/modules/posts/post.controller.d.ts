import { PostsService } from './post.service';
import { DataResponse, ExceptionResponse } from '../../common/response';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getAll(): Promise<DataResponse | ExceptionResponse>;
    getById(id: string): Promise<DataResponse | ExceptionResponse>;
    delete(id: string): Promise<DataResponse | ExceptionResponse>;
}
