import { DepartmentsService } from './departments.service';
import { DataResponse, ExceptionResponse } from '../../common/response';
export declare class DepartmentsController {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    getAllDepartments(): Promise<DataResponse | ExceptionResponse>;
    createDepartment(createData: any): Promise<DataResponse | ExceptionResponse>;
    getDepartmentById(id: string): Promise<DataResponse | ExceptionResponse>;
    updateDepartment(id: string, updateData: any): Promise<DataResponse | ExceptionResponse>;
    deleteDepartment(id: string): Promise<DataResponse | ExceptionResponse>;
    createField(createData: any): Promise<DataResponse | ExceptionResponse>;
    getFieldById(id: string): Promise<DataResponse | ExceptionResponse>;
    updateField(id: string, updateData: any): Promise<DataResponse | ExceptionResponse>;
    deleteField(id: string): Promise<DataResponse | ExceptionResponse>;
}
