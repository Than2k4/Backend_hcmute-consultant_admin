import { QuestionsService } from './questions.service';
import { DataResponse, ExceptionResponse } from 'src/common/response';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    getAllQuestions(): Promise<DataResponse | ExceptionResponse>;
    getQuestionById(id: string): Promise<DataResponse | ExceptionResponse>;
    deleteQuestion(id: string): Promise<DataResponse | ExceptionResponse>;
}
