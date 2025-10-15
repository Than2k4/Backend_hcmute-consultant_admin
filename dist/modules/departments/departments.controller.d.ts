import { DepartmentsService } from './departments.service';
import { DataResponse, ExceptionResponse } from '../../common/response';
export declare class DepartmentsController {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    getAllDepartments(): Promise<DataResponse | ExceptionResponse>;
}
