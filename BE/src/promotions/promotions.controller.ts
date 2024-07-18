import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  Render,
} from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { ProductsService } from 'src/products/products.service';
import { SITE_DOMAIN } from 'src/utils/const';

@Controller('/')
export class PromotionController {
  constructor(
    private readonly promotionService: PromotionsService,
    private readonly productService: ProductsService,
  ) {}

  @Get('/promotion')
  @Render('pages/promotion/promotion')
  async promotion(
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    const promotions = await this.promotionService.findAll(
      undefined,
      limit,
      page,
    );

    const total = await this.promotionService.count();

    return {
      backend_base_url: SITE_DOMAIN,
      promotions: promotions,
      total: total,
      limit: limit,
      page: page,
    };
  }

  @Get('/create-promotion')
  @Render('pages/promotion/create-promotion')
  createPromotion() {
    return {
      backend_base_url: SITE_DOMAIN,
    };
  }

  @Get('/update-promotion')
  @Render('pages/promotion/update-promotion')
  async updatePromotion(@Query('id') id: string) {
    const promotion = await this.promotionService.findOne(id);
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);

    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    return {
      ...promotion,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      backend_base_url: SITE_DOMAIN,
    };
  }

  @Get('/update-promotion-item')
  @Render('pages/promotion/edit-item')
  async itemPromotion(@Query('id') id: string) {
    const items = await this.promotionService.findAllItem(id);

    const products = [];

    for (const item of items) {
      const product = await this.productService.findOne(item.productId);
      products.push({ ...product, quantity: item.quantity });
    }

    return {
      backend_base_url: SITE_DOMAIN,
      id: id,
      products: products,
    };
  }
}
