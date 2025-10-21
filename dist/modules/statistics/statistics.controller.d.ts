import { StatisticsService } from './statistics.service';
import { DataResponse, ExceptionResponse } from 'src/common/response';
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
    getOverviewStatistics(): Promise<DataResponse | ExceptionResponse>;
    getQuestionStatistics(): Promise<DataResponse | ExceptionResponse>;
    getAnswerStatistics(): Promise<DataResponse | ExceptionResponse>;
}
