import { AnswersService } from './answers.service';
import { DataResponse, ExceptionResponse } from '../../common/response';
export declare class AnswersController {
    private readonly answersService;
    constructor(answersService: AnswersService);
    getAllAnswers(): Promise<DataResponse | ExceptionResponse>;
    getAnswerDetail(id: string): Promise<DataResponse | ExceptionResponse>;
    deleteAnswer(id: string): Promise<DataResponse | ExceptionResponse>;
}
