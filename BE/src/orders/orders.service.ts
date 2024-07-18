import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { DatabaseService } from 'src/database/database.service';
import { MyDBException } from 'src/utils/error';
import { PagingOrderInput } from './dto/paging-order.input';
import { PromotionsService } from 'src/promotions/promotions.service';
import { PROMOTION_TYPE } from 'src/utils/const';
import { ProductsService } from 'src/products/products.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ThankYouForOrderMail } from 'src/utils/templateEmail';

@Injectable()
export class OrdersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly promotionService: PromotionsService,
    private readonly productService: ProductsService,
    private readonly mailerService: MailerService,
  ) {}

  async create(
    createOrderInput: CreateOrderInput,
    ownerId: string,
    email?: any,
    firstName?: string,
  ) {
    try {
      const { contactId, promotionId, isPaid, paymentMethod, items } =
        createOrderInput;

      let totalPrice = 0;
      let reducePrice = 0;

      // Validate each product in the items array
      for (const item of items) {
        const product = await this.productService.findOne(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} does not exist.`);
        }
        totalPrice += item.price * item.quantity;
      }

      // Calculate reduce price
      const promotion = await this.promotionService.findOne(promotionId);

      if (promotionId && promotion) {
        if (promotion.type === PROMOTION_TYPE.VALUE)
          reducePrice =
            promotion.discountValue > totalPrice
              ? promotion.discountValue
              : totalPrice;
        else if (promotion.type === PROMOTION_TYPE.PERCENT) {
          reducePrice = totalPrice * (promotion.discountPercentage / 100);
        }
      }

      return await this.databaseService.$transaction(async (transaction) => {
        const order = await transaction.order.create({
          data: {
            contactId,
            promotionId,
            isPaid,
            totalPrice,
            reducePrice,
            ownerId: ownerId,
            paymentMethod,
            priceToPay: totalPrice - reducePrice,
          },
        });

        // Create order items
        for (const item of items) {
          await transaction.productOrder.create({
            data: {
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            },
          });
        }

        this.mailerService
          .sendMail(ThankYouForOrderMail(email, firstName, order.id))
          .catch((err) => console.log(err));

        return order;
      });
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  async findMany(conditions: PagingOrderInput, ownerId: string = undefined) {
    try {
      const offset =
        conditions.limit && conditions.page
          ? (conditions.page - 1) * conditions.limit
          : 0;

      let where = {};
      if (ownerId) {
        where = { ownerId: ownerId };
      }

      const orders = await this.databaseService.order.findMany({
        skip: offset,
        take: conditions.limit,
        orderBy: { updatedAt: 'desc' },
        where: where,
      });

      const count = await this.databaseService.order.count({
        where: where,
      });

      return {
        limit: conditions.limit,
        page: conditions.page,
        total: count,
        data: orders,
      };
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  findOne(id: string) {
    try {
      return this.databaseService.order.findFirst({ where: { id: id } });
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  async update(id: string, updateOrderInput: UpdateOrderInput) {
    try {
      const isOk = await this.databaseService.order.update({
        where: { id: id },
        data: updateOrderInput,
      });

      return isOk ? true : false;
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  async findItems(orderId: string) {
    try {
      const result = await this.databaseService.productOrder.findMany({
        where: { orderId: orderId },
      });

      return result;
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }
}
