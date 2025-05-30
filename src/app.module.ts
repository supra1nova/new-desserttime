import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminLoginModule } from './backoffice-modules/admin-login/admin-login.module';
import { AdminMemberModule } from './backoffice-modules/admin-member/admin-member.module';
import { AdminUserInterestDessertModule } from './backoffice-modules/admin-user-interest-dessert/admin-user-interest-dessert.module';
import { AdminPointModule } from './backoffice-modules/admin-point/admin-point.module';
import { AdminPointHistoryModule } from './backoffice-modules/admin-point-history/admin-point-history.module';
import { AdminQnaModule } from './backoffice-modules/admin-qna/admin-qna.module';
import { AdminDessertCategoryModule } from './backoffice-modules/admin-dessert-category/admin-dessert-category.module';
import { AdminReviewModule } from './backoffice-modules/admin-review/admin-review.module';
import { AdminReviewIngredientModule } from './backoffice-modules/admin-review-ingredient/admin-review-ingredient.module';
import { AdminReviewImgModule } from './backoffice-modules/admin-review-img/admin-review-img.module';
import { NoticeModule } from './backoffice-modules/notice/notice.module';
import { MemberModule } from './client-modules/member/member.module';
import { DessertCategoryModule } from './client-modules/dessert-category/dessert-category.module';
import { QnAModule } from './client-modules/qna/qna.module';
import { InitModule } from './config/moduleInit/init.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeORMConfig } from './config/typeorm/typeorm.config';
import helmet from 'helmet';
import { LoggerMiddleware } from './config/middleware/logger.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './config/interceptor/response.interceptor';
import { ReviewModule } from './client-modules/review/review.module';
import { AccusationModule } from './client-modules/accusation/accusation.module';
import { FileTransModule } from './config/file/filetrans.module';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { AuthModule } from './config/auth/auth.module';

@Module({
  imports: [
    AdminLoginModule,
    AdminMemberModule,
    AdminUserInterestDessertModule,
    AdminPointModule,
    AdminPointHistoryModule,
    AdminQnaModule,
    AdminDessertCategoryModule,
    AdminReviewModule,
    AdminReviewIngredientModule,
    AdminReviewImgModule,
    NoticeModule,
    MemberModule,
    DessertCategoryModule,
    QnAModule,
    InitModule,
    ReviewModule,
    AccusationModule,
    FileTransModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: [`env/.env.${process.env.NODE_ENV}`],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: process.env.ROOT_PATH, // 파일 업로드할 디렉토리를 제공
      serveStaticOptions: {
        //index: false, // 디렉토리 색인 페이지 표시 비활성화
        setHeaders: (res, filePath) => {
          const filename= filePath.split('/').pop(); // 파일 경로에서 파일명 추출
          res.setHeader('Content-Security-Policy', 'upgrade-insecure-requests', `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`);
        },
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => await typeORMConfig(configService),
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // '*'는 모든 라우트에 대한 적용을 의미합니다.
    consumer.apply(helmet()).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
