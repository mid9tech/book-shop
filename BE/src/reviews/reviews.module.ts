import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsResolver } from './reviews.resolver';
import { ReviewsController } from './review.controller';
import { ProductsModule } from 'src/products/products.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [ReviewsResolver, ReviewsService],
  controllers: [ReviewsController],
  imports: [ProductsModule, UsersModule],
})
export class ReviewsModule {}
