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
import {
  ErrorResponseBody,
  FailResponseBody,
  PaginationQueryParamsDto,
} from '../types.dto';
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
      data: new ProductResponseDto(result),
    };
  }

  /**
   * Retrieves all products with optional pagination parameters.
   *
   * @param pagination - The pagination parameters for retrieving products.
   * @returns A Promise containing an object with the status, an array of product data, and pagination metadata.
   */
  @Get()
  async findAll(
    @Query() pagination: PaginationQueryParamsDto,
  ): Promise<ProductArrayResponseBody> {
    const result = await this.productsService.findAll(pagination);

    return {
      status: 'success',
      data: result.map((r) => new ProductResponseDto(r)),
      meta: {
        ...pagination,
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
    @Param('productId') productId: number,
  ): Promise<ProductResponseBody> {
    const result = await this.productsService.findOne(productId);

    return {
      status: 'success',
      data: new ProductResponseDto(result),
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
    @Param('productId') productId: number,
    @Body() payload: UpdateProductRequestBody,
  ): Promise<ProductResponseBody> {
    const result = await this.productsService.update(productId, payload.data);

    return {
      status: 'success',
      data: new ProductResponseDto(result),
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
    @Param('productId') productId: number,
  ): Promise<ProductResponseBody> {
    const result = await this.productsService.delete(productId);

    return {
      status: 'success',
      data: new ProductResponseDto(result),
    };
  }
}
