import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MyDBException } from 'src/utils/error';
import { CreatePromotionItemInput } from './dto/create-item.input';

@Injectable()
export class ItemPromotionRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async createOrUpdate(createItemPromotionInput: CreatePromotionItemInput) {
    try {
      const { productId, promotionId, quantity } = createItemPromotionInput;

      // Check if the promotion already exists
      const existingPromotion =
        await this.databaseService.productPromotion.findUnique({
          where: {
            productId_promotionId: {
              productId,
              promotionId,
            },
          },
        });

      if (existingPromotion) {
        // If the promotion exists, update the quantity
        return await this.databaseService.productPromotion.update({
          where: {
            productId_promotionId: {
              productId,
              promotionId,
            },
          },
          data: {
            quantity: existingPromotion.quantity + quantity,
          },
        });
      } else {
        // If the promotion doesn't exist, create a new one
        return await this.databaseService.productPromotion.create({
          data: {
            promotionId,
            productId,
            quantity,
          },
        });
      }
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  async findAllByPromotionId(id: string) {
    try {
      return this.databaseService.productPromotion.findMany({
        where: {
          promotionId: id,
        },
      });
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  async findOnePromotionItem(
    promotionId: string,
    productId: string,
    quantity: number,
  ) {
    try {
      return this.databaseService.productPromotion.findFirst({
        where: {
          promotionId: promotionId,
          productId: productId,
          quantity: { lte: quantity },
        },
      });
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  async updateQuantity(
    productId: string,
    promotionId: string,
    quantity: number,
  ) {
    try {
      await this.databaseService.productPromotion.update({
        where: {
          productId_promotionId: {
            productId,
            promotionId,
          },
        },
        data: {
          quantity: quantity,
        },
      });

      return true;
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  async deletePromotionItem(productId: string, promotionId: string) {
    try {
      await this.databaseService.productPromotion.delete({
        where: {
          productId_promotionId: {
            productId,
            promotionId,
          },
        },
      });

      return true;
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }
}
