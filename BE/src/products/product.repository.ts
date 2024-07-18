import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MyDBException } from 'src/utils/error';
import { CreateProductInput } from './dto/create-product.input';
import { STATUS_PRODUCT } from 'src/utils/const';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProductInput: CreateProductInput, createdBy: string) {
    try {
      const {
        name,
        price,
        avatar,
        images,
        description,
        categoryId,
        publisherId,
        author,
      } = createProductInput;

      return await this.databaseService.product.create({
        data: {
          name: name,
          price: price,
          avatar: avatar,
          images: images,
          description: description,
          author: author,
          categoryId: categoryId,
          publisherId: publisherId,
          createdBy: createdBy,
        },
      });
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  async count(where: any = null) {
    return await this.databaseService.product.count({
      where: where,
    });
  }

  async findMany(offset: number, limit: number, where: any = null) {
    return await this.databaseService.product.findMany({
      skip: offset,
      take: limit,
      where: where,
      orderBy: { updatedAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.databaseService.product.findFirst({
      where: {
        id: id,
        status: {
          not: STATUS_PRODUCT.DELETED,
        },
      },
    });
  }

  async update(
    id: string,
    updateProductInput: UpdateProductInput,
    rate?: number,
    ratingCount?: number,
  ) {
    const result = await this.databaseService.product.update({
      where: { id: id },
      data: { ...updateProductInput, rate: rate, ratingCount: ratingCount },
    });

    return result ? true : false;
  }
}
