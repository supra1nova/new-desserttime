import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { winstonLogger } from '../logger/winston.util';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const request = context.switchToHttp().getRequest();
        const { ip, method, originalUrl } = request;
        const resData = {
          success: true,
          timestamp: new Date().toISOString(),
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: 'Request successful',
          data,
        };
        winstonLogger.log({
          ip,
          method,
          originalUrl,
          resData,
        });
        return resData;
      }),
    );
  }
}
