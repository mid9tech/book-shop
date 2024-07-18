import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MyBadRequestException, MyDBException } from 'src/utils/error';
import { CreatePromotionInput } from './dto/create-promotion.input';
import { UpdatePromotionInput } from './dto/update-promotion.input';
import { PROMOTION_LEVEL } from 'src/utils/const';

@Injectable()
export class PromotionRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPromotionInput: CreatePromotionInput) {
    try {
      const {
        name,
        type,
        minValue,
        discountPercentage,
        description,
        discountValue,
        level,
        banner,
        startDate,
        endDate,
      } = createPromotionInput;

      if (isNaN(Date.parse(startDate)) || isNaN(Date.parse(endDate))) {
        throw new MyBadRequestException('Invalid date format');
      }

      return await this.databaseService.promotion.create({
        data: {
          name: name,
          type: type,
          minValue: minValue,
          discountPercentage: discountPercentage,
          description: description,
          discountValue: discountValue,
          level: level,
          banner: banner,
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
        },
      });
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  count() {
    return this.databaseService.user.count();
  }

  async findMany(
    isAvailablePromotions: boolean | undefined,
    limit?: number,
    offset?: number,
  ) {
    let where = {};
    where = { status: true };

    if (isAvailablePromotions) {
      where = {
        ...where,
        endDate: { gt: new Date() },
        startDate: { lt: new Date() },
      };
    }

    return await this.databaseService.promotion.findMany({
      take: limit,
      skip: offset,
      where: where,
      orderBy: { updatedAt: 'desc' },
    });
  }

  async recommend(totalValue: number, level: PROMOTION_LEVEL) {
    return await this.databaseService.promotion.findMany({
      where: {
        status: true,
        endDate: { gt: new Date() },
        startDate: { lt: new Date() },
        minValue: { lte: totalValue },
        level: level,
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.databaseService.promotion.findFirst({
      where: {
        id: id,
        status: true,
      },
    });
  }

  async update(id: string, updatePromotionInput: UpdatePromotionInput) {
    const result = await this.databaseService.promotion.update({
      where: { id: id },
      data: updatePromotionInput,
    });

    return result ? true : false;
  }
}
