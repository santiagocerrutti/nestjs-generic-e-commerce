import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { randomUUID } from 'crypto';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      _id: '640ef7ca-01c6-4931-b3c0-900fc2e657b1',
      title: 'Park Is Mine, The',
      description:
        'est risus auctor sed tristique in tempus sit amet sem fusce consequat nulla nisl',
      code: '129905510-9',
      price: 72.09,
      status: true,
      stock: 52,
      category: 'Action|Drama|Thriller',
      thumbnails: [
        'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=856&q=80',
      ],
    },
    {
      _id: '6e324eea-1a29-490b-9e18-69c2e8da7816',
      title: "Dupes, The (Al-makhdu'un)",
      description:
        'laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui vel sem sed sagittis nam congue risus semper porta',
      code: '698375539-1',
      price: 58.01,
      status: true,
      stock: 75,
      category: 'Drama',
      thumbnails: [
        'https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      ],
    },
    {
      _id: '354d9abc-34cc-4cb7-9748-b6614a1189d3',
      title: 'Spanglish',
      description:
        'sapien cursus vestibulum proin eu mi nulla ac enim in tempor turpis nec euismod scelerisque quam turpis adipiscing lorem vitae',
      code: '206097384-8',
      price: 83.58,
      status: true,
      stock: 72,
      category: 'Comedy|Drama|Romance',
      thumbnails: [
        'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80',
      ],
    },
  ];

  async findAll() {
    return Promise.resolve(this.products);
  }

  async findOne(productId: string) {
    const product = this.products.find((p) => p._id === productId);

    if (product) {
      return Promise.resolve(product);
    }
    throw new NotFoundException();
  }

  async create(product: ProductDto) {
    const newProduct = {
      ...product,
      _id: randomUUID(),
    };

    this.products.push(newProduct);

    return Promise.resolve(newProduct);
  }

  async update(productId: string, product: Partial<ProductDto>) {
    const index = this.products.findIndex((p) => p._id === productId);

    if (index >= 0) {
      const updatedProduct = {
        ...this.products[index],
        ...product,
      };

      this.products[index] = updatedProduct;

      return Promise.resolve(updatedProduct);
    }
    throw new NotFoundException();
  }

  /**
   * TODO: esto devuelve un:
  {
    "message": "Not Found",
    "statusCode": 404
  }
    Debería devolver un error que cumpla con el estándar
   */

  async delete(productId: string) {
    const product = this.findOne(productId);
    if (product) {
      this.products = this.products.filter((p) => p._id !== productId);

      return Promise.resolve(product);
    }
    throw new NotFoundException();
  }
}
