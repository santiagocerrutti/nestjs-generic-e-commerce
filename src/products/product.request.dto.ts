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
import { ObjectRequestBody } from '../types.dto';

export class ProductRequestDto {
  /** @example "Elegant Steel Ball" */
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  /** @example "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality" */
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  /** @example a4de7cfb3845592acedccfad */
  @IsString()
  @IsNotEmpty()
  readonly code: string;

  /** @example 293 */
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  /** @example true */
  @IsBoolean()
  @IsNotEmpty()
  readonly status: boolean;

  /** @example 86 */
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  /** @example Towels */
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

export class PartialProductRequestDto extends PartialType(ProductRequestDto) {}

export class CreateProductRequestBody extends ObjectRequestBody<ProductRequestDto> {
  @Type(() => ProductRequestDto)
  data: ProductRequestDto;
}

export class UpdateProductRequestBody extends ObjectRequestBody<PartialProductRequestDto> {
  @Type(() => PartialProductRequestDto)
  data: PartialProductRequestDto;
}
