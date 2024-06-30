import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // TODO: revisar si se justifica el uso de diferentes archivos .env
      // TODO: verificar que esto funcione con docker-compose (debería funcionar porque las variables de runtime tienen precedencia)
      envFilePath: '.dev.env',
      isGlobal: true,
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
