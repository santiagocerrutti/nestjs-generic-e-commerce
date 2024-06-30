import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nestjs Generic E-Commerce')
    .setDescription(
      'Server Application to manage and purchase products. It provides a full platform to create, update and delete products and to create a shopping cart selecting products and purchase them. The application is secured by JWT mechanism and has features for admin, premium and common users.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidocs', app, document);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  // TODO: llevar esto a una variable de entorno

  await app.listen(8081);
}
bootstrap();
