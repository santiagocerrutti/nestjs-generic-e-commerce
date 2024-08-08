import { Exclude, Expose, Type } from 'class-transformer';
import { SuccessResponseBody } from '../types.dto';

@Exclude()
export class ProductResponseDto {
  /** @example "Modern Bronze Salad" */
  @Expose()
  readonly title: string;

  /** @example "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016" */
  @Expose()
  readonly description: string;

  /** @example 4f1fd47ca3dd2dd6cfc03ca1 */
  @Expose()
  readonly code: string;

  /** @example 103 */
  @Expose()
  @Type(() => Number)
  readonly price: number;

  /** @example Gloves */
  @Expose()
  readonly category: string;

  /**
   * A list of thumbnails urls
   * @example ['https://loremflickr.com/640/480/food?lock=6499831142940672']
   */
  @Expose()
  readonly thumbnails: string[];
}

export class ProductResponseBody extends SuccessResponseBody<ProductResponseDto> {
  @Type(() => ProductResponseDto)
  data: ProductResponseDto;
}

export class ProductArrayResponseBody extends SuccessResponseBody<
  ProductResponseDto[]
> {
  @Type(() => ProductResponseDto)
  data: ProductResponseDto[];

  meta: {
    limit: number;
    offset: number;
  };
}
