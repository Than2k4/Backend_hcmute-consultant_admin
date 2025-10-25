import { StatisticsService } from './statistics.service';
import { DataResponse, ExceptionResponse } from 'src/common/response';
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
    getOverviewStatistics(): Promise<ExceptionResponse | DataResponse>;
    getQuestionStatistics(): Promise<ExceptionResponse | DataResponse>;
    getAnswerStatistics(): Promise<ExceptionResponse | DataResponse>;
}
