import { createMock } from '@golevelup/ts-jest';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  mockCreateResult,
  mockFindOneByResult,
  mockFindResult,
  mockProductsRepository,
  mockSaveResult,
} from './__mocks__/products.repository';
import { Product } from './product.entity';
import { ProductRequestDto } from './product.request.dto';
import { ProductSchema } from './product.schema';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(ProductSchema),
          useValue: createMock<Repository<Product>>({
            ...mockProductsRepository,
          }),
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get<Repository<Product>>(
      getRepositoryToken(ProductSchema),
    );
  });

  describe('findAll', () => {
    it('should return all products and call repository', async () => {
      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual(mockFindResult);
      expect(repository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return found product', async () => {
      // Prepare
      const productId = 1;

      // Act
      const result = await service.findOne(productId);

      // Assert
      expect(result).toEqual(mockFindOneByResult);
      expect(repository.findOneBy).toHaveBeenCalledTimes(1);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: productId });
    });

    it('should throw error when product is not found', async () => {
      // Prepare
      repository.findOneBy = jest.fn().mockResolvedValueOnce(null);
      const productId = 1;

      // Act
      const error = await service.findOne(productId).catch((e) => e);

      // Assert
      expect(error).toBeInstanceOf(NotFoundException);
      expect(repository.findOneBy).toHaveBeenCalledTimes(1);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: productId });
    });
  });

  describe('create', () => {
    it('should create a product when valid data is provided', async () => {
      // Prepare
      const productDto: ProductRequestDto = {
        title: 'Test Product',
        description: 'Test Description',
        code: 'TP001',
        price: 100,
        status: true,
        stock: 10,
        category: 'Test Category',
        thumbnails: ['thumb1.jpg'],
      };

      // Act
      const result = await service.create(productDto);

      // Assert
      expect(result).toEqual(mockSaveResult);
      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledWith(productDto);
      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith(mockCreateResult);
    });
  });

  describe('update', () => {
    it('should update the product when a valid productId and productDto are provided', async () => {
      // Prepare
      const productId = 1;
      const productDto: Partial<ProductRequestDto> = {
        title: 'Updated Product',
        description: 'Updated Description',
      };

      // Act
      const result = await service.update(productId, productDto);

      // Assert
      expect(result).toEqual(mockSaveResult);
      expect(repository.findOneBy).toHaveBeenCalledTimes(1);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: productId });
      expect(repository.merge).toHaveBeenCalledTimes(1);
      expect(repository.merge).toHaveBeenCalledWith(
        mockFindOneByResult,
        productDto,
      );
      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith(mockFindOneByResult);
    });

    it('should throw NotFoundException when the productId does not exist', async () => {
      // Prepare
      const productId = 999;
      const productDto: Partial<ProductRequestDto> = {
        title: 'Non-existent Product',
        description: 'Non-existent Description',
      };
      repository.findOneBy = jest.fn().mockResolvedValueOnce(null);

      // Act
      const error = await service.update(productId, productDto).catch((e) => e);

      // Assert
      expect(error).toBeInstanceOf(NotFoundException);
      expect(repository.findOneBy).toHaveBeenCalledTimes(1);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: productId });
    });
  });

  describe('delete', () => {
    it('should delete a product when a valid productId is provided', async () => {
      // Prepare
      const productId = 1;

      // Act
      const result = await service.delete(productId);

      // Assert
      expect(result).toEqual(mockFindOneByResult);
      expect(repository.findOneBy).toHaveBeenCalledTimes(1);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: productId });
      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledWith(productId);
    });

    it('should throw NotFoundException when productId does not exist', async () => {
      // Prepare
      const productId = 1;
      repository.findOneBy = jest.fn().mockResolvedValueOnce(null);

      // Act
      const error = await service.delete(productId).catch((e) => e);

      // Assert
      expect(error).toBeInstanceOf(NotFoundException);
      expect(repository.findOneBy).toHaveBeenCalledTimes(1);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: productId });
    });
  });
});
