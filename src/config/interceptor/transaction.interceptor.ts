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
  
  @Injectable()
  export class TransactionInterceptor implements NestInterceptor {
    constructor(private readonly dataSource: DataSource) {}
    private readonly logger = new Logger();
  
    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
  
      const request = context.switchToHttp().getRequest();
      request.queryRunnerManager = queryRunner.manager;
  
      return next.handle().pipe(
        catchError(async (error) => {
          await queryRunner.rollbackTransaction();
          await queryRunner.release();
  
          const { ip, method, originalUrl } = request;
  
          const errorResponse = {
            timestamp: new Date(),
            originalUrl,
            method: method,
            ip,
            message: error.message,
            error,
          };
          this.logger.error({ errorResponse });
  
          if (error instanceof HttpException) {
            throw new HttpException(error.getResponse(), error.getStatus());
          }
          throw new InternalServerErrorException();
        }),
        tap(async () => {
          await queryRunner.commitTransaction();
          await queryRunner.release();
        }),
      );
    }
  }
  