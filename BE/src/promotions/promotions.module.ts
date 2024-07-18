import { Module } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { PromotionsResolver } from './promotions.resolver';
import { PromotionController } from './promotions.controller';
import { PromotionRepository } from './promotions.repository';
import { ItemPromotionRepository } from './item-promotions.repository';
import { ProductsModule } from 'src/products/products.module';

@Module({
  providers: [
    PromotionsResolver,
    PromotionsService,
    PromotionRepository,
    ItemPromotionRepository,
  ],
  controllers: [PromotionController],
  imports: [ProductsModule],
  exports: [PromotionsService],
})
export class PromotionsModule {}
