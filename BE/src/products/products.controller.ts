import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  Render,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CategoriesService } from 'src/categories/categories.service';
import { CATEGORY_TYPE, SITE_DOMAIN } from 'src/utils/const';
import { PublishersService } from 'src/publishers/publishers.service';

@Controller('/')
export class ProductController {
  constructor(
    private readonly productService: ProductsService,
    private readonly categoryService: CategoriesService,
    private readonly publisherService: PublishersService,
  ) {}

  @Get('/category-product')
  @Render('pages/product/category-product')
  async categoryProduct(
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('keyword') keyword?: string,
  ) {
    const parents = await this.categoryService.findMany(
      CATEGORY_TYPE.PARENT,
      null,
    );

    const result = [];
    for (const category of parents) {
      const childs = await this.categoryService.findMany(
        CATEGORY_TYPE.CHILDREN,
        category.id,
      );
      result.push({
        parent: category,
        childs: childs,
      });
    }

    const products = await this.productService.returnSearchProduct({
      page: page,
      limit: limit,
      keyword: keyword,
      isOnSale: undefined,
    });

    return {
      backend_base_url: SITE_DOMAIN,
      categories: result,
      products: products.data,
      total: products.total,
      page: page,
      limit: limit,
    };
  }

  @Get('/create-category-product')
  @Render('pages/product/create-product')
  async createProduct() {
    const categories = await this.categoryService.findMany(
      CATEGORY_TYPE.CHILDREN,
      undefined,
    );

    const publishers = await this.publisherService.findMany();

    return {
      backend_base_url: SITE_DOMAIN,
      categories: categories,
      publishers: publishers,
    };
  }

  @Get('/update-category-product')
  @Render('pages/product/update-product')
  async updateProduct(@Query('id') id: string) {
    const categories = await this.categoryService.findMany(
      CATEGORY_TYPE.CHILDREN,
      undefined,
    );

    const publishers = await this.publisherService.findMany();

    const product = await this.productService.findOne(id);

    return {
      backend_base_url: SITE_DOMAIN,
      categories: categories,
      publishers: publishers,
      product: product,
    };
  }

  @Get('/on-sale')
  @Render('pages/product/on-sale')
  async onSale(
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    const products = await this.productService.returnSearchProduct({
      isOnSale: true,
      page: page,
      limit: limit,
      keyword: null,
    });

    return {
      backend_base_url: SITE_DOMAIN,
      products: products.data,
      total: products.total,
      page: page,
      limit: limit,
    };
  }
}
