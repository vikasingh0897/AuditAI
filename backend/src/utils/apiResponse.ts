class ApiResponse<T> {
  public statusCode: number;
  public data: T;
  public message: string;
  public success: boolean;

  constructor(statusCode: number, data: T, message: string = 'Success') {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
