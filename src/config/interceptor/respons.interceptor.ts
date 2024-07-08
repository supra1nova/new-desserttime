import {
    CallHandler,
    ExecutionContext,
    HttpException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable, catchError, tap } from 'rxjs';
  import { DataSource } from 'typeorm';
import { winstonLogger } from '../logger/winston.util';
import { map } from 'rxjs/operators';

  @Injectable()
  export class ResponseInterceptor implements NestInterceptor {

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        return next.handle().pipe(
          map((data) => ({
            success:true,
            timestamp: new Date().toISOString(),
            statusCode: context.switchToHttp().getResponse().statusCode,
            message: 'Request successful',
            data,
          })),
        );
      }
  }
  