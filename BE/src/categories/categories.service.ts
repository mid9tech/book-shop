import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { CategoriesRepository } from './categories.repository';
import { CATEGORY_TYPE } from 'src/utils/const';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: CategoriesRepository) {}

  create(id: string, createCategoryInput: CreateCategoryInput) {
    return this.categoryRepository.create(id, createCategoryInput);
  }

  findMany(type: CATEGORY_TYPE, parentId: string) {
    return this.categoryRepository.findMany(type, parentId);
  }

  findOne(id: string) {
    return this.categoryRepository.findOne(id);
  }

  update(id: string, updateCategoryInput: UpdateCategoryInput) {
    return this.categoryRepository.update(id, updateCategoryInput);
  }

  async removeCategoryParent(id: string) {
    return await this.categoryRepository.removeCategoryParent(id);
  }
}
