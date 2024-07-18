import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  Render,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ProductsService } from 'src/products/products.service';
import { SITE_DOMAIN } from 'src/utils/const';

@Controller('/')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly productsService: ProductsService,
  ) {}

  @Get('/review')
  @Render('pages/review/review')
  async order(
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    const reviews = [];

    const temp = await this.reviewsService.findMany({
      limit: limit,
      page: page,
    });

    for (const item of temp.data) {
      const product = await this.productsService.findOne(item.productId);
      reviews.push({
        ...item,
        avatar: product.avatar,
        name: product.name,
      });
    }

    return {
      backend_base_url: SITE_DOMAIN,
      reviews: reviews,
      total: temp.total,
      limit: limit,
      page: page,
    };
  }
}
