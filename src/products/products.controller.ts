import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreateProductRequestBody,
  UpdateProductRequestBody,
} from './product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  /**
   * Creates a new product.
   *
   * @param payload - The request body containing the product data.
   * @returns An object with the status and the created product data.
   */
  @Post()
  async create(@Body() payload: CreateProductRequestBody) {
    const result = await this.productsService.create(payload.data);

    return {
      status: 'success',
      data: result,
    };
  }

  // TODO: Implementar paginado (ver recursos de paginación en NestJS (notion))
  @Get()
  async findAll(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    const result = await this.productsService.findAll();

    return {
      status: 'success',
      data: result,
      meta: {
        limit,
        offset,
      },
    };
  }

  // TODO: validar el formato del id con una clase.
  // @see: https://docs.nestjs.com/techniques/validation#:~:text=the%20ValidationPipe%20can%20be%20used%20with%20other%20request%20object%20properties%20as%20well
  @Get('/:productId')
  async findOne(@Param('productId') productId: string) {
    const result = await this.productsService.findOne(productId);

    return {
      status: 'success',
      data: result,
    };
  }

  @Put('/:productId')
  async update(
    @Param('productId') productId: string,
    @Body() payload: UpdateProductRequestBody,
  ) {
    const result = await this.productsService.update(productId, payload.data);

    return {
      status: 'success',
      data: result,
    };
  }

  @Delete('/:productId')
  async delete(@Param('productId') productId: string) {
    const result = await this.productsService.delete(productId);

    return {
      status: 'success',
      data: result,
    };
  }
}
