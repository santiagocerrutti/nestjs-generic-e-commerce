import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import {
  mockCreateResult,
  mockDeleteResult,
  mockFindOneResult,
  mockProductsService,
  mockUpdateResult,
} from './__mocks__/products.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PaginationQueryParamsDto } from 'src/types.dto';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: createMock<ProductsService>({ ...mockProductsService }),
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  describe('findAll', () => {
    it('should find all products', async () => {
      // Prepare
      const params: PaginationQueryParamsDto = {
        limit: 10,
        offset: 0,
      };

      // Act
      const result = await controller.findAll(params);

      // Assert
      expect(result).toEqual({
        status: 'success',
        data: expect.any(
          Array<{
            title: string;
            description: string;
            code: string;
            price: number;
            category: string;
            thumbnails: string[];
          }>,
        ),
        meta: { limit: params.limit, offset: params.offset },
      });

      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(service.findAll).toHaveBeenCalledWith(params);
    });
  });

  describe('findOne', () => {
    it('should find one product', async () => {
      // Prepare
      const productId = 1;

      // Act
      const result = await controller.findOne(productId);

      // Assert
      expect(result).toEqual({
        status: 'success',
        data: mockFindOneResult,
      });

      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(productId);
    });
  });

  describe('create', () => {
    it('should create a product', async () => {
      // Prepare
      const payload = {
        data: {
          title: 'New Product',
          description: 'A new product description',
          code: '123456789',
          price: 99.99,
          status: true,
          stock: 10,
          category: 'New Category',
          thumbnails: ['https://example.com/image.jpg'],
        },
      };

      // Act
      const result = await controller.create(payload);

      // Assert
      expect(result).toEqual({
        status: 'success',
        data: mockCreateResult,
      });

      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(payload.data);
    });
  });

  describe('update', () => {
    it('should update a product by id', async () => {
      // Prepare
      const productId = 1;
      const payload = {
        data: {
          description: 'An updated product description',
        },
      };

      // Act
      const result = await controller.update(productId, payload);

      // Assert
      expect(result).toEqual({
        status: 'success',
        data: mockUpdateResult,
      });

      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith(productId, payload.data);
    });
  });

  describe('should delete a product by id', () => {
    it('should create a product', async () => {
      // Prepare
      const productId = 1;

      // Act
      const result = await controller.delete(productId);

      // Assert
      expect(result).toEqual({
        status: 'success',
        data: mockDeleteResult,
      });

      expect(service.delete).toHaveBeenCalledTimes(1);
      expect(service.delete).toHaveBeenCalledWith(productId);
    });
  });
});
