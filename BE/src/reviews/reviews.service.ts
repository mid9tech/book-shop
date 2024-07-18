import { Injectable } from '@nestjs/common';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { DatabaseService } from 'src/database/database.service';
import { MyBadRequestException, MyDBException } from 'src/utils/error';
import { PagingReviewInput } from './dto/paging-review.input';
import { ProductsService } from 'src/products/products.service';
import { REVIEW_SORT } from 'src/utils/const';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly productsService: ProductsService,
  ) {}

  async create(createReviewInput: CreateReviewInput, ownerId: string) {
    try {
      const { productId, content, rate, images, title } = createReviewInput;

      // Check if the review already exists
      const existingReview = await this.databaseService.review.findUnique({
        where: {
          ownerId_productId: {
            ownerId,
            productId,
          },
        },
      });

      if (existingReview) {
        // If a review already exists, throw a custom error
        throw new MyBadRequestException('You are already review this product.');
      }

      // find product
      const product = await this.productsService.findOne(productId);

      await this.productsService.update(
        productId,
        undefined,
        product.rate
          ? createReviewInput.rate
          : (product.ratingCount * product.rate + createReviewInput.rate) /
              (product.ratingCount + 1),
        product.ratingCount + 1,
      );

      // If no review exists, create a new one
      const review = await this.databaseService.review.create({
        data: {
          productId,
          content,
          rate,
          images,
          ownerId,
          title,
        },
      });

      return review;
    } catch (error) {
      // Handle and throw a custom exception
      return new MyDBException(error.message);
    }
  }

  async findMany(
    conditions: PagingReviewInput,
    ownerId: string = undefined,
    productId?: string,
    isActive: boolean = false,
  ) {
    try {
      const offset =
        conditions.limit && conditions.page
          ? (conditions.page - 1) * conditions.limit
          : 0;

      let where = {};
      if (ownerId) {
        where = { ownerId: ownerId };
      }

      if (productId) {
        where = { ...where, productId: productId };
      }

      if (conditions.rate) {
        where = { ...where, rate: conditions.rate };
      }

      if (isActive) {
        where = { ...where, status: true };
      }

      const orders = await this.databaseService.review.findMany({
        skip: offset,
        take: conditions.limit,
        orderBy: {
          createdAt: conditions.sort === REVIEW_SORT.LATEST ? 'desc' : 'asc',
        },
        where: where,
      });

      const count = await this.databaseService.review.count({
        where: where,
      });

      return {
        limit: conditions.limit,
        page: conditions.page,
        total: count,
        data: orders,
        countOneStar: await this.databaseService.review.count({
          where: { rate: 1, productId: productId },
        }),
        countTwoStar: await this.databaseService.review.count({
          where: { rate: 2, productId: productId },
        }),
        countThreeStar: await this.databaseService.review.count({
          where: { rate: 3, productId: productId },
        }),
        countFourStar: await this.databaseService.review.count({
          where: { rate: 4, productId: productId },
        }),
        countFiveStar: await this.databaseService.review.count({
          where: { rate: 5, productId: productId },
        }),
      };
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  findOne(ownerId: string, productId: string) {
    try {
      return this.databaseService.review.findFirst({
        where: { ownerId: ownerId, productId: productId },
      });
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }

  async update(
    productId: string,
    ownerId: string,
    updateReviewInput: UpdateReviewInput,
  ) {
    try {
      const isOk = await this.databaseService.review.update({
        where: {
          ownerId_productId: { ownerId, productId },
        },
        data: updateReviewInput,
      });

      return isOk ? true : false;
    } catch (error) {
      throw new MyDBException(error.message);
    }
  }
}
