import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { DatabaseService } from 'src/database/database.service';
import { CATEGORY_TYPE } from 'src/utils/const';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createdBy: string, createCategoryInput: CreateCategoryInput) {
    const { name, description, type, parentId } = createCategoryInput;

    return this.databaseService.category.create({
      data: { name, description, type, createdBy, parentId },
    });
  }

  findMany(type: CATEGORY_TYPE, parentId: string) {
    return this.databaseService.category.findMany({
      where: { type: type, parentId: parentId, status: true },
      orderBy: { updatedAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.databaseService.category.findFirst({
      where: { id: id, status: true },
    });
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput) {
    const result = await this.databaseService.category.update({
      where: { id: id },
      data: updateCategoryInput,
    });

    return result ? true : false;
  }

  async removeCategoryParent(id: string) {
    try {
      this.databaseService.$transaction(async (prismaClient) => {
        const children = await prismaClient.category.findMany({
          where: {
            parentId: id,
          },
        });

        // Update children categories
        for (const child of children) {
          await prismaClient.category.update({
            where: { id: child.id },
            data: {
              status: false,
            },
          });
        }

        // Update the parent category
        await prismaClient.category.update({
          where: { id },
          data: {
            status: false,
          },
        });
      });

      return true;
    } catch (error) {
      console.error('Error removing category parent:', error.message);
      return false;
    }
  }
}
