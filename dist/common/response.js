"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionResponse = exports.DataResponse = void 0;
class DataResponse {
    constructor(status, message, data) {
        this.status = status;
        this.message = message;
        this.data = data;
        if (typeof data === 'undefined')
            throw new Error('DataResponse requires data');
        if (!message)
            throw new Error('DataResponse requires message');
        if (!status)
            throw new Error('DataResponse requires status');
    }
}
exports.DataResponse = DataResponse;
class ExceptionResponse {
    constructor(status, message, data = null) {
        this.status = status;
        this.message = message;
        this.data = data;
        if (!message)
            throw new Error('ExceptionResponse requires message');
        if (!status)
            throw new Error('ExceptionResponse requires status');
    }
}
exports.ExceptionResponse = ExceptionResponse;
//# sourceMappingURL=response.js.map