import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PromotionsService } from './promotions.service';
import { Promotion } from './entities/promotion.entity';
import { CreatePromotionInput } from './dto/create-promotion.input';
import { UpdatePromotionInput } from './dto/update-promotion.input';
import { CreatePromotionItemInput } from './dto/create-item.input';
import { PromotionItem } from './entities/item-promotion.entity';
import { RecommendInput } from './dto/recommend.input';
import { UseGuards } from '@nestjs/common';
import { JwtAccessAuthGuard } from 'src/guard/jwt-auth.guard';

@Resolver(() => Promotion)
export class PromotionsResolver {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Mutation(() => Promotion)
  createPromotion(
    @Args('createPromotionInput') createPromotionInput: CreatePromotionInput,
  ) {
    return this.promotionsService.create(createPromotionInput);
  }

  @Mutation(() => PromotionItem)
  createItemPromotion(
    @Args('createPromotionItemInput')
    createPromotionItemInput: CreatePromotionItemInput,
  ) {
    return this.promotionsService.createItem(createPromotionItemInput);
  }

  @Query(() => [Promotion], { name: 'promotions' })
  findAll(
    @Args('isAvailablePromotions', { nullable: true })
    isAvailablePromotions: boolean,
  ) {
    return this.promotionsService.findAll(isAvailablePromotions);
  }

  @Query(() => Promotion, { name: 'promotion' })
  findOne(@Args('id') id: string) {
    return this.promotionsService.findOne(id);
  }

  @Mutation(() => Boolean)
  updatePromotion(
    @Args('updatePromotionInput') updatePromotionInput: UpdatePromotionInput,
  ) {
    return this.promotionsService.update(
      updatePromotionInput.id,
      updatePromotionInput,
    );
  }

  @Mutation(() => Boolean)
  updateQuantityPromotionItem(
    @Args('updateQuantityPromotionItem') update: CreatePromotionItemInput,
  ) {
    return this.promotionsService.updateItemQuantity(
      update.productId,
      update.promotionId,
      update.quantity,
    );
  }

  @Mutation(() => Boolean)
  deletePromotionItem(
    @Args('promotionId') promotionId: string,
    @Args('productId') productId: string,
  ) {
    return this.promotionsService.deletePromotionItem(productId, promotionId);
  }

  @Query(() => [Promotion], { name: 'recommend' })
  @UseGuards(JwtAccessAuthGuard)
  getRecommendPromotions(
    @Args('recommendInput') recommendInput: RecommendInput,
  ) {
    return this.promotionsService.getRecommendPromotions(recommendInput);
  }
}
