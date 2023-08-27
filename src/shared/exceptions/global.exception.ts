import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  async catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = 'Internal Server Error';

    response.status(statusCode).json({
      statusCode,
      message,
      error: exception.message || 'Unknown Error',
    });
  }
}
