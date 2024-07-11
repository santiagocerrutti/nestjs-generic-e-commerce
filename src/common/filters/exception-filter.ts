import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

/**
 * Catches HttpException and handles it by formatting the response based on the exception status.
 * @param exception The HttpException that was caught
 * @param host The ArgumentsHost object containing the request context
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const errorCode =
      Object.keys(HttpStatus)[Object.values(HttpStatus).indexOf(status)];

    if (400 <= status && status < 500) {
      const errors =
        typeof exceptionResponse['message'] === 'string'
          ? [exceptionResponse['message']]
          : exceptionResponse['message'];

      response.status(status).json({
        status: 'fail',
        data: {
          errorCode: errorCode,
          errors: errors,
        },
      });
    } else {
      const message =
        typeof exceptionResponse['message'] === 'string'
          ? exceptionResponse['message']
          : exceptionResponse['message'].join(', ');

      response.status(status).json({
        status: 'error',
        data: {
          errorCode: errorCode,
        },
        message: message,
      });
    }
  }
}
