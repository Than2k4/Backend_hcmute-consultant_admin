export class DataResponse {
  constructor(
    public status: number,
    public message: string,
    public data: any,
  ) {
    if (typeof data === 'undefined') throw new Error('DataResponse requires data');
    if (!message) throw new Error('DataResponse requires message');
    if (!status) throw new Error('DataResponse requires status');
  }
}

export class ExceptionResponse {
  constructor(
    public status: number,
    public message: string,
    public data: any = null,
  ) {
    if (!message) throw new Error('ExceptionResponse requires message');
    if (!status) throw new Error('ExceptionResponse requires status');
  }
}
