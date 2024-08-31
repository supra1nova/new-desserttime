import { CallHandler, ExecutionContext, HttpException, Injectable, InternalServerErrorException, Logger, NestInterceptor } from '@nestjs/common';
import { Observable, catchError, tap } from 'rxjs';
import { DataSource } from 'typeorm';
import { winstonLogger } from '../logger/winston.util';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { ip, method, originalUrl } = request;
    return next.handle().pipe(
      catchError(async (error) => {
        throw error;
      }),
      tap(async () => {}),
    );
  }
}
