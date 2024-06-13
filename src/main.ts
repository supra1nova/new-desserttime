import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as expressBasicAuth from 'express-basic-auth';
import { APIDocument } from './config/swagger/swagger.api.document';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // app.use(
  //   ['/docs', '/docs-json'],
  //   expressBasicAuth({
  //     challenge: true,
  //     users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD },
  //   }),
  // );
  new APIDocument().initializeOptions(app);

  await app.listen(3000);
  
}
bootstrap();
