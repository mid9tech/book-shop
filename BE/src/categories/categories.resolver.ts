import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category, CategoryChild } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { CurrentUser, JwtAdminAuthGuard } from 'src/guard/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUserInterface } from 'src/interfaces/current-user.interface';
import { CATEGORY_TYPE } from 'src/utils/const';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  @UseGuards(JwtAdminAuthGuard)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.categoriesService.create(user.id, createCategoryInput);
  }

  @Query(() => [Category], { name: 'categories' })
  findAll() {
    return this.categoriesService.findMany(CATEGORY_TYPE.PARENT, null);
  }

  @ResolveField(() => [CategoryChild], { name: 'childs' })
  findChilds(@Parent() parent: Category) {
    return this.categoriesService.findMany(CATEGORY_TYPE.CHILDREN, parent.id);
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAdminAuthGuard)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoriesService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAdminAuthGuard)
  removeCategoryParent(@Args('id') id: string) {
    return this.categoriesService.removeCategoryParent(id);
  }
}
