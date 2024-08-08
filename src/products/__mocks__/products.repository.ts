import { Product } from '../product.entity';

const fakeProducts: Product[] = [
  {
    id: 1,
    title: 'Elegant Steel Ball',
    description:
      'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
    code: 'a4de7cfb3845592acedccfad',
    price: 293,
    status: true,
    stock: 86,
    category: 'Towels',
    thumbnails: ['https://loremflickr.com/640/480/food?lock=1011313511759872'],
  },
  {
    id: 2,
    title: 'Modern Bronze Salad',
    description:
      'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
    code: '4f1fd47ca3dd2dd6cfc03ca1',
    price: 103,
    status: true,
    stock: 56,
    category: 'Gloves',
    thumbnails: ['https://loremflickr.com/640/480/food?lock=6499831142940672'],
  },
  {
    id: 3,
    title: 'Modern Metal Car',
    description:
      'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
    code: 'cece537d44da2aadf07c4d66',
    price: 554,
    status: true,
    stock: 70,
    category: 'Towels',
    thumbnails: ['https://loremflickr.com/640/480/food?lock=5042146096709632'],
  },
  {
    id: 4,
    title: 'Intelligent Metal Cheese',
    description:
      'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
    code: '2ce1bfa8d32f763daed76163',
    price: 603,
    status: true,
    stock: 76,
    category: 'Salad',
    thumbnails: ['https://loremflickr.com/640/480/food?lock=2418136341020672'],
  },
];

export const mockFindResult = fakeProducts;
export const mockFindOneByResult = fakeProducts[1];
export const mockSaveResult = fakeProducts[2];
export const mockCreateResult = fakeProducts[3];

export const mockProductsRepository = {
  find: jest.fn().mockResolvedValue(mockFindResult),
  findOneBy: jest.fn().mockResolvedValue(mockFindOneByResult),
  create: jest.fn().mockReturnValue(mockCreateResult),
  save: jest.fn().mockResolvedValue(mockSaveResult),
};