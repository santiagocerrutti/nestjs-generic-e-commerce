import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductSchema } from './product.schema';
import { ProductRequestDto } from './product.request.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductSchema)
    private productsRepository: Repository<Product>,
  ) {}

  /**
   * Retrieves all products from the database.
   *
   * @returns A promise that resolves to an array of Product objects representing all products.
   */
  async findAll(): Promise<Product[]> {
    const result = await this.productsRepository.find();

    return result;
  }

  /**
   * Retrieves a product by its ID from the database.
   *
   * @param productId - The ID of the product to retrieve.
   * @returns A promise that resolves to the Product object representing the product with the specified ID.
   * @throws NotFoundException with an error message 'Product not found' if the product with the given ID does not exist.
   */
  async findOne(productId: number): Promise<Product> {
    const product = await this.productsRepository.findOneBy({
      id: productId,
    });

    if (product) return product;
    throw new NotFoundException({
      errors: ['Product not found'],
    });
  }

  /**
   * Creates a new product in the database.
   *
   * @param productDto - The data transfer object containing information about the product to be created.
   * @returns A promise that resolves to the Product object representing the newly created product.
   */
  async create(productDto: ProductRequestDto): Promise<Product> {
    const product = this.productsRepository.create(productDto);

    const result = await this.productsRepository.save(product);

    return result;
  }

  /**
   * Updates a product in the database based on the provided product ID and data.
   *
   * @param productId - The ID of the product to update.
   * @param productDto - The partial data transfer object containing the updated information for the product.
   * @returns A promise that resolves to the Product object representing the updated product.
   * @throws NotFoundException with an error message 'Product not found' if the product with the given ID does not exist.
   */
  async update(
    productId: number,
    productDto: Partial<ProductRequestDto>,
  ): Promise<Product> {
    const product = await this.productsRepository.findOneBy({
      id: productId,
    });

    if (product) {
      this.productsRepository.merge(product, {
        ...productDto,
        updatedAt: new Date(),
      });

      const result = await this.productsRepository.save(product);

      return result;
    }

    throw new NotFoundException({
      errors: ['Product not found'],
    });
  }

  /**
   * Deletes a product from the database based on the provided product ID.
   *
   * @param productId - The ID of the product to delete.
   * @returns A promise that resolves to the Product object representing the deleted product.
   * @throws NotFoundException with an error message 'Product not found' if the product with the given ID does not exist.
   */
  async delete(productId: number): Promise<Product> {
    const product = await this.productsRepository.findOneBy({
      id: productId,
    });

    if (product) {
      this.productsRepository.merge(product, {
        deletedAt: new Date(),
      });

      const result = await this.productsRepository.save(product);

      return result;
    }

    throw new NotFoundException(['Product not found']);
  }
}
