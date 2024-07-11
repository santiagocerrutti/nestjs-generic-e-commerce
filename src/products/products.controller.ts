import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { ErrorResponseBody, FailResponseBody } from 'src/types.dto';
import {
  CreateProductRequestBody,
  UpdateProductRequestBody,
} from './product.request.dto';
import {
  ProductArrayResponseBody,
  ProductResponseBody,
  ProductResponseDto,
} from './product.response.dto';
import { ProductsService } from './products.service';

@ApiTags('products')
@ApiInternalServerErrorResponse({
  description: 'InternalServerError',
  type: ErrorResponseBody,
  example: {
    status: 'error',
    data: {
      errorCode: 'INTERNAL_SERVER_ERROR',
    },
    message: 'Internal Server Error',
  },
})
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  /**
   * Creates a new product.
   *
   * @param payload - The request body containing the product data.
   * @returns An object with the status and the created product data.
   */
  @ApiBadRequestResponse({
    description: 'Invalid body',
    type: FailResponseBody,
    example: {
      status: 'fail',
      data: {
        errorCode: 'BAD_REQUEST',
        errors: [
          'data.title should not be empty',
          'data.title must be a string',
        ],
      },
    },
  })
  @Post()
  async create(
    @Body() payload: CreateProductRequestBody,
  ): Promise<ProductResponseBody> {
    const result = await this.productsService.create(payload.data);

    return {
      status: 'success',
      data: plainToInstance(ProductResponseDto, result),
    };
  }

  /**
   * Retrieves all products with optional pagination parameters.
   *
   * @param limit - The maximum number of products to retrieve (default: 100).
   * @param offset - The offset for paginating through the products (default: 0).
   * @returns An object with the status, an array of product data, and pagination metadata.
   */
  @Get()
  async findAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
  ): Promise<ProductArrayResponseBody> {
    const result = await this.productsService.findAll();

    return {
      status: 'success',
      data: result.map((r) => plainToInstance(ProductResponseDto, r)),
      meta: {
        limit,
        offset,
      },
    };
  }

  /**
   * Retrieves a single product by its ID.
   *
   * @param productId - The ID of the product to retrieve.
   * @returns An object with the status and the retrieved product data.
   */
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: FailResponseBody,
    example: {
      status: 'fail',
      data: {
        errorCode: 'NOT_FOUND',
        errors: ['Product not found'],
      },
    },
  })
  @Get('/:productId')
  async findOne(
    @Param('productId') productId: string,
  ): Promise<ProductResponseBody> {
    const result = await this.productsService.findOne(productId);

    return {
      status: 'success',
      data: plainToInstance(ProductResponseDto, result),
    };
  }

  /**
   * Updates a product by its ID.
   *
   * @param productId - The ID of the product to update.
   * @param payload - The request body containing the updated product data.
   * @returns An object with the status and the updated product data.
   */
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: FailResponseBody,
    example: {
      status: 'fail',
      data: {
        errorCode: 'NOT_FOUND',
        errors: ['Product not found'],
      },
    },
  })
  @Put('/:productId')
  async update(
    @Param('productId') productId: string,
    @Body() payload: UpdateProductRequestBody,
  ): Promise<ProductResponseBody> {
    const result = await this.productsService.update(productId, payload.data);

    return {
      status: 'success',
      data: plainToInstance(ProductResponseDto, result),
    };
  }

  /**
   * Deletes a product by its ID.
   *
   * @param productId - The ID of the product to delete.
   * @returns An object with the status and the result of the deletion operation.
   */
  @ApiNotFoundResponse({
    description: 'Not Found',
    type: FailResponseBody,
    example: {
      status: 'fail',
      data: {
        errorCode: 'NOT_FOUND',
        errors: ['Product not found'],
      },
    },
  })
  @Delete('/:productId')
  async delete(
    @Param('productId') productId: string,
  ): Promise<ProductResponseBody> {
    const result = await this.productsService.delete(productId);

    return {
      status: 'success',
      data: plainToInstance(ProductResponseDto, result),
    };
  }
}
