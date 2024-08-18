import 'dotenv/config';
import { DataSource } from 'typeorm';
import { ProductSchema } from '../products/product.schema';

const dataSource = new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [ProductSchema],
  migrations: ['src/database/migrations/*.ts'],
});

export default dataSource;
