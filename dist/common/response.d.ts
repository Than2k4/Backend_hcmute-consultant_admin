export declare class DataResponse {
    status: number;
    message: string;
    data: any;
    constructor(status: number, message: string, data: any);
}
export declare class ExceptionResponse {
    status: number;
    message: string;
    data: any;
    constructor(status: number, message: string, data?: any);
}
