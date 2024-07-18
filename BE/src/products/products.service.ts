import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductRepository } from './product.repository';
import { SearchConditionInput } from './dto/serch-condition.input';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createProductInput: CreateProductInput, createdBy: string) {
    try {
      return await this.productRepository.create(createProductInput, createdBy);
    } catch (error) {
      throw error;
    }
  }

  async returnSearchProduct(conditions: SearchConditionInput) {
    const offset =
      conditions.limit && conditions.page
        ? (conditions.page - 1) * conditions.limit
        : 0;

    let where = {};

    if (conditions.isOnSale) {
      where = { ...where, isOnSale: conditions.isOnSale };
    }

    if (conditions.keyword) {
      // Edit here for full-text search using case-insensitive search
      where = {
        ...where,
        name: {
          contains: conditions.keyword,
          mode: 'insensitive',
        },
      };
    }

    if (conditions.categoryIds) {
      where = { ...where, categoryId: { in: conditions.categoryIds } };
    }

    if (conditions.publisherIds) {
      where = { ...where, publisherId: { in: conditions.publisherIds } };
    }

    if (conditions.minPrice) {
      where = {
        ...where,
        OR: [
          { price: { gte: conditions.minPrice } },
          { priceSale: { gte: conditions.minPrice } },
        ],
      };
    }

    if (conditions.maxPrice) {
      where = {
        ...where,
        OR: [
          { price: { lte: conditions.maxPrice } },
          { priceSale: { lte: conditions.maxPrice } },
        ],
      };
    }

    if (conditions.rate) {
      where = {
        ...where,
        rate: {
          gte: conditions.rate,
          lte: conditions.rate + 1,
        },
      };
    }

    const total = await this.productRepository.count(where);
    const products = await this.productRepository.findMany(
      offset,
      conditions.limit,
      where,
    );
    return {
      total: total,
      limit: conditions.limit,
      page: conditions.page,
      data: products,
    };
  }

  findOne(id: string) {
    return this.productRepository.findOne(id);
  }

  update(
    id: string,
    updateProductInput: UpdateProductInput,
    rate?: number,
    ratingCount?: number,
  ) {
    return this.productRepository.update(
      id,
      updateProductInput,
      rate,
      ratingCount,
    );
  }
}
