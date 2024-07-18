import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesRepository } from './categories.repository';

@Module({
  providers: [CategoriesResolver, CategoriesService, CategoriesRepository],
  exports: [CategoriesService],
})
export class CategoriesModule {}
