import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { winstonLogger } from '../logger/winston.util';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse();

    const { ip, method, originalUrl } = request;

    if (typeof error === 'string') {
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        error,
      });
    } else {
      //nestjs 에서 생성시킨 오류는 else로 처리
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        ...error, //비구조처리
      });
    }
    const errorResponse = {
      timestamp: new Date(),
      originalUrl,
      method: method,
      ip,
      error,
    };
    winstonLogger.error({ errorResponse });

    // if (error instanceof HttpException) {
    //   throw new HttpException(error.getResponse(), error.getStatus());
    // }
    // throw new InternalServerErrorException();
  }
}
