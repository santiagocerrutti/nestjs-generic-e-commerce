import { Product } from '../product.entity';

export const fakeProducts: Product[] = [
  {
    _id: '7c7a2ccfafbfd8f997117c19',
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
    _id: 'f7d72ed8ba4548d6a9e0d8bd',
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
    _id: 'db9fbfb2449bdd652e6eae1d',
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
    _id: '83e86d747cdbabd4a7d1aecd',
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

export const mockFindAllResult = fakeProducts;
export const mockFindOneResult = fakeProducts[0];
export const mockCreateResult = fakeProducts[1];
export const mockUpdateResult = fakeProducts[2];
export const mockDeleteResult = fakeProducts[3];

export const mockProductsService = {
  findAll: jest.fn().mockResolvedValue(mockFindAllResult),
  findOne: jest.fn().mockResolvedValue(mockFindOneResult),
  create: jest.fn().mockResolvedValue(mockCreateResult),
  update: jest.fn().mockResolvedValue(mockUpdateResult),
  delete: jest.fn().mockResolvedValue(mockDeleteResult),
};
