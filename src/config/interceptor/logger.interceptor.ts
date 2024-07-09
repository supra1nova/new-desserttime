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
  
  @Injectable()
  export class LoggerInterceptor implements NestInterceptor {
  
    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();    
        const { ip, method, originalUrl } = request;
        const accessData = {
            timestamp: new Date(),
            originalUrl,
            method: method,
            ip,
          };
          winstonLogger.log({ accessData });
  
      return next.handle().pipe(

        tap(async () => {

        }),
      );
    }
  }
  