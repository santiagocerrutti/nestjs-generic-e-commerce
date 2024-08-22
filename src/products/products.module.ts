import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSchema } from './product.schema';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSchema])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
