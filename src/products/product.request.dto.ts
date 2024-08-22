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
  /**
   * Name of the product
   * @example "Elegant Steel Ball"
   */
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  /**
   * Description of the product
   * @example "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality"
   * */
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  /**
   * Identification code of the product
   * @example a4de7cfb3845592acedccfad
   * */
  @IsString()
  @IsNotEmpty()
  readonly code: string;

  /**
   * Unit price of the product
   * @example 293.02
   * */
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  /**
   * Availability of the product
   * @example true
   * */
  @IsBoolean()
  @IsNotEmpty()
  readonly status: boolean;

  /**
   * Number of units available to purchase
   * @example 86
   * */
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  /**
   * Category of the product
   * @example Towels
   * */
  @IsString()
  @IsNotEmpty()
  readonly category: string;

  /**
   * List of thumbnails urls
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
