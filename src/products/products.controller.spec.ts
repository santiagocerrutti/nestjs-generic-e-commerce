import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { mockProductsService } from './__mocks__/products.service';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: createMock<ProductsService>(mockProductsService),
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  describe('findAll', () => {
    it('should find all products', async () => {
      // Act
      const result = await controller.findAll();

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
        meta: { limit: expect.any(Number), offset: expect.any(Number) },
      });

      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should find one product', async () => {
      // Prepare
      const productId = '7c7a2ccfafbfd8f997117c19';

      // Act
      const result = await controller.findOne(productId);

      // Assert
      expect(result).toEqual({
        status: 'success',
        data: {
          title: 'Elegant Steel Ball',
          description:
            'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
          code: 'a4de7cfb3845592acedccfad',
          price: 293,
          category: 'Towels',
          thumbnails: [
            'https://loremflickr.com/640/480/food?lock=1011313511759872',
          ],
        },
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
        data: {
          title: 'Modern Bronze Salad',
          description:
            'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
          code: '4f1fd47ca3dd2dd6cfc03ca1',
          price: 103,
          category: 'Gloves',
          thumbnails: [
            'https://loremflickr.com/640/480/food?lock=6499831142940672',
          ],
        },
      });

      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(payload.data);
    });
  });

  describe('update', () => {
    it('should update a product by id', async () => {
      // Prepare
      const productId = '7c7a2ccfafbfd8f997117c19';
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
        data: {
          title: 'Modern Metal Car',
          description:
            'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
          code: 'cece537d44da2aadf07c4d66',
          price: 554,
          category: 'Towels',
          thumbnails: [
            'https://loremflickr.com/640/480/food?lock=5042146096709632',
          ],
        },
      });

      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith(productId, payload.data);
    });
  });

  describe('should delete a product by id', () => {
    it('should create a product', async () => {
      // Prepare
      const productId = '7c7a2ccfafbfd8f997117c19';

      // Act
      const result = await controller.delete(productId);

      // Assert
      expect(result).toEqual({
        status: 'success',
        data: {
          title: 'Intelligent Metal Cheese',
          description:
            'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
          code: '2ce1bfa8d32f763daed76163',
          price: 603,
          thumbnails: [
            'https://loremflickr.com/640/480/food?lock=2418136341020672',
          ],
          category: 'Salad',
        },
      });

      expect(service.delete).toHaveBeenCalledTimes(1);
      expect(service.delete).toHaveBeenCalledWith(productId);
    });
  });
});
