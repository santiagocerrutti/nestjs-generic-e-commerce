import { EntitySchema } from 'typeorm';
import { Product } from './product.entity';

// @see: https://www.postgresql.org/docs/current/datatype.html
export const ProductSchema = new EntitySchema<Product>({
  name: 'Product',
  target: Product,
  columns: {
    id: {
      type: 'integer',
      primary: true,
      generated: true,
    },
    title: { type: 'text' },
    description: { type: 'text' },
    code: { type: 'text' },
    // this is: 8 digits in total where 2 are decimals
    price: { type: 'numeric', precision: 8, scale: 2 },
    status: { type: 'boolean', default: true },
    stock: { type: 'integer' },
    category: { type: 'text' },
    thumbnails: { type: 'jsonb' },
  },
});
