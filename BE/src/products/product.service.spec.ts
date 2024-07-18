import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { STATUS_PRODUCT } from 'src/utils/const';

export const mockProduct = [
  {
    id: '1',
    name: 'Product 1',
    description: 'Description of product 1',
    categoryId: 'cat1',
    publisherId: 'pub1',
    price: 100,
    priceSale: 80,
    isOnSale: true,
    avatar: 'avatar1.jpg',
    rate: 4.5,
    ratingCount: 10,
    author: ['Author 1'],
    images: ['image1.jpg', 'image2.jpg'],
    status: STATUS_PRODUCT.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'Description of product 2',
    categoryId: 'cat2',
    publisherId: 'pub2',
    price: 150,
    priceSale: 120,
    isOnSale: true,
    avatar: 'avatar2.jpg',
    rate: 4.0,
    ratingCount: 5,
    author: ['Author 2'],
    images: ['image3.jpg', 'image4.jpg'],
    status: STATUS_PRODUCT.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockProductService = {
  create: jest.fn().mockResolvedValueOnce(mockProduct[0]),
  returnSearchProduct: jest.fn().mockResolvedValueOnce(mockProduct),
  findOne: jest.fn().mockResolvedValueOnce(mockProduct[0]),
  update: jest.fn().mockResolvedValue(mockProduct[0]),
};

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: ProductsService, useValue: mockProductService }],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should returns product created', async () => {
      expect(
        await service.create(
          {
            name: 'Product 1',
            description: 'Description of product 1',
            categoryId: 'cat1',
            publisherId: 'pub1',
            price: 100,
            avatar: 'avatar1.jpg',
            author: ['Author 1'],
            images: ['image1.jpg', 'image2.jpg'],
          },
          '1',
        ),
      ).toEqual(mockProduct[0]);
    });
  });

  describe('returnSearchProduct', () => {
    it('should returns products fit with conditions', async () => {
      expect(await service.returnSearchProduct({ limit: 10, page: 1 })).toEqual(
        mockProduct,
      );
    });
  });

  describe('findOne', () => {
    it('should returns product with id', async () => {
      expect(await service.findOne('1')).toEqual(mockProduct[0]);
    });
  });

  describe('update', () => {
    it('should returns about information updated', async () => {
      expect(
        await service.update('1', {
          name: 'title',
          description: 'description',
          id: '1',
          price: 100,
          priceSale: 80,
          isOnSale: true,
          avatar: 'avatar1.jpg',
          author: ['Author 1'],
          images: ['image1.jpg', 'image2.jpg'],
          status: STATUS_PRODUCT.ACTIVE,
          categoryId: 'categoryId',
          publisherId: 'publisherId',
        }),
      ).toEqual(mockProduct[0]);
    });
  });
});
