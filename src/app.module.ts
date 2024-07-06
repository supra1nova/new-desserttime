import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as path from 'path';
import { MemberModule } from './modules/member/member.module';
import { DessertCategoryModule } from './modules/dessert-category/dessert-category.module';
import { QnAModule } from './modules/qna/qna.module';
import { InitModule } from './config/moduleInit/init.module';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { typeORMConfig } from './config/typeorm/typeorm.config';
import helmet from 'helmet';
import { LoggerMiddleware } from './config/middleware/logger.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MemberModule,
    DessertCategoryModule,
    QnAModule,
    InitModule,
    //AuthModule,
    ConfigModule.forRoot({
      envFilePath: [
        process.env.NODE_ENV === 'production'
          ? path.join(process.cwd(), 'config', '.env.production')
          : path.join(process.cwd(), 'config', '.env.development'),
      ],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: path.join(String(process.env.fileroot)),
      serveStaticOptions: {
        //index: false, // 디렉토리 색인 페이지 표시 비활성화
        setHeaders: (res) => {
          res.setHeader(
            'Content-Security-Policy',
            'upgrade-insecure-requests',
            //  `attachment; filename=${encodeURIComponent(path)}`,
          );
          //res.setHeader('Content-Type', 'application/octet-stream'); // MIME 유형 설정
        },
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        await typeORMConfig(configService),
    }),

],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // '*'는 모든 라우트에 대한 적용을 의미합니다.
    consumer
      .apply(helmet())
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}