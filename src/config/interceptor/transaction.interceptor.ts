/*
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, catchError, tap } from 'rxjs';
import { DataSource } from 'typeorm';

@Injectable()
export class testTransactionInterceptor implements NestInterceptor {
  constructor(private readonly dataSource: DataSource) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
      console.log(request.method);

      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      request.queryRunnerManager = queryRunner.manager;

      return next.handle().pipe(
        catchError(async (error) => {
          await queryRunner.rollbackTransaction();
          await queryRunner.release();
        }),
        tap(async () => {
          await queryRunner.commitTransaction();
          await queryRunner.release();
        }),
      );
    }
    return next.handle();
  }
}
*/
