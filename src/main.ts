import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/exception-filter';
import { IConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: IConfig = app.get(ConfigService).get('config');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nestjs Generic E-Commerce')
    .setDescription(
      'Server Application to manage and purchase products. It provides a full platform to create, update and delete products and to create a shopping cart selecting products and purchase them. The application is secured by JWT mechanism and has features for admin, premium and common users.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('apidocs', app, document);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      // This is to remove properties not declared in DTO
      whitelist: true,
      transformOptions: {
        // This is to transform to number the properties declared in DTO
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Starts listening for shutdown hooks, this is used by Health-check module
  app.enableShutdownHooks();

  await app.listen(configService.port);
}
bootstrap();
