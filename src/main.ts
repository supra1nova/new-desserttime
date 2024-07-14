import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as expressBasicAuth from 'express-basic-auth';
import { APIDocument } from './config/swagger/swagger.api.document';
import { NestExpressApplication } from '@nestjs/platform-express';
import { winstonLogger } from './config/logger/winston.util';
import { HttpExceptionFilter } from './config/filters/http.exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // app.use(
  //   ['/docs', '/docs-json'],
  //   expressBasicAuth({
  //     challenge: true,
  //     users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD },
  //   }),
  // );
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: winstonLogger,
  });
  app.enableCors();
  new APIDocument().initializeOptions(app);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
