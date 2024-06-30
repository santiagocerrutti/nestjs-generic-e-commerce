import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';
import { ObjectRequestBody } from '../types';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly code: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly status: boolean;

  @IsNumber({ maxDecimalPlaces: 0 })
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @IsString()
  @IsNotEmpty()
  readonly category: string;

  /**
   * A list of thumbnails urls
   * @example ['https://simpleicon.com/wp-content/uploads/movie-1.png']
   */
  @IsArray()
  @ArrayMinSize(1)
  @IsUrl({}, { each: true })
  readonly thumbnails: string[];
}

export class PartialProductDto extends PartialType(ProductDto) {}

export class CreateProductRequestBody extends ObjectRequestBody<ProductDto> {
  @Type(() => ProductDto)
  data: ProductDto;
}

export class UpdateProductRequestBody extends ObjectRequestBody<PartialProductDto> {
  @Type(() => PartialProductDto)
  data: PartialProductDto;
}
