import { Test, TestingModule } from '@nestjs/testing';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { mockProduct, mockProductService } from './product.service.spec';
import { STATUS_PRODUCT } from 'src/utils/const';

describe('ProductsResolver', () => {
  let resolver: ProductsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsResolver,
        {
          provide: ProductsService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    resolver = module.get<ProductsResolver>(ProductsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createProductInput', () => {
    it('should returns product created', async () => {
      expect(
        await resolver.createProduct(
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
          {},
        ),
      ).toEqual(undefined);
    });
  });

  describe('search', () => {
    it('should returns all product fit with condition', async () => {
      expect(await resolver.search({ limit: 10, page: 1 })).toEqual(undefined);
    });
  });

  describe('findOne', () => {
    it('should returns product with correct id', async () => {
      expect(await resolver.findOne('1')).toEqual(undefined);
    });
  });

  describe('update', () => {
    it('should returns about information updated', async () => {
      expect(
        await resolver.updateProduct({
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
