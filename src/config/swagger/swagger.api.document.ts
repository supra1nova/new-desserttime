import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export class APIDocument {
  public builder = new DocumentBuilder();

  public initializeOptions(app: INestApplication) {
    const options = this.builder
      .setTitle('Dessert Time')
      .setDescription('Dessert Time API Document')
      .setVersion('1.0')
      .addTag('DT')
      .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Token',
      })
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('desser-time', app, document);
  }
}
