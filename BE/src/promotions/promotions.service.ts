import { Injectable } from '@nestjs/common';
import { CreatePromotionInput } from './dto/create-promotion.input';
import { UpdatePromotionInput } from './dto/update-promotion.input';
import { PromotionRepository } from './promotions.repository';
import { CreatePromotionItemInput } from './dto/create-item.input';
import { ItemPromotionRepository } from './item-promotions.repository';
import { RecommendInput } from './dto/recommend.input';
import { PROMOTION_LEVEL } from 'src/utils/const';

@Injectable()
export class PromotionsService {
  constructor(
    private readonly promotionRepository: PromotionRepository,
    private readonly itemPromotionRepository: ItemPromotionRepository,
  ) {}

  create(createPromotionInput: CreatePromotionInput) {
    return this.promotionRepository.create(createPromotionInput);
  }

  count() {
    return this.promotionRepository.count();
  }

  findAll(
    isAvailablePromotions?: boolean | undefined,
    limit?: number,
    page?: number,
  ) {
    const offset = limit && page ? (page - 1) * limit : 0;
    return this.promotionRepository.findMany(
      isAvailablePromotions,
      limit,
      offset,
    );
  }

  findOne(id: string) {
    return this.promotionRepository.findOne(id);
  }

  update(id: string, updatePromotionInput: UpdatePromotionInput) {
    return this.promotionRepository.update(id, updatePromotionInput);
  }

  createItem(createPromotionItemInput: CreatePromotionItemInput) {
    return this.itemPromotionRepository.createOrUpdate(
      createPromotionItemInput,
    );
  }

  async findAllItem(id: string) {
    return this.itemPromotionRepository.findAllByPromotionId(id);
  }

  updateItemQuantity(productId: string, promotionId: string, quantity: number) {
    return this.itemPromotionRepository.updateQuantity(
      productId,
      promotionId,
      quantity,
    );
  }

  deletePromotionItem(productId: string, promotionId: string) {
    return this.itemPromotionRepository.deletePromotionItem(
      productId,
      promotionId,
    );
  }

  async getRecommendPromotions(recommendInput: RecommendInput) {
    let result = [];
    result = await this.promotionRepository.recommend(
      recommendInput.totalValue,
      PROMOTION_LEVEL.ORDER,
    );

    const allPromotionLevelItem = await this.promotionRepository.recommend(
      undefined,
      PROMOTION_LEVEL.ITEM,
    );

    for (const item of allPromotionLevelItem) {
      let isOk = true;

      const itemsPromotion =
        await this.itemPromotionRepository.findAllByPromotionId(item.id);

      for (const itemPromotion of itemsPromotion) {
        const foundProduct = recommendInput.products.find(
          (product) =>
            product.productId === itemPromotion.productId &&
            product.quantity >= itemPromotion.quantity,
        );
        if (!foundProduct) {
          isOk = false;
          break;
        }
      }

      if (isOk && recommendInput.totalValue >= item.minValue) {
        result.push(item);
      }
    }

    return result;
  }
}
