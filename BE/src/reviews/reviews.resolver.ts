import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { UseGuards } from '@nestjs/common';
import {
  CurrentUser,
  JwtAccessAuthGuard,
  JwtAdminAuthGuard,
} from 'src/guard/jwt-auth.guard';
import { CurrentUserInterface } from 'src/interfaces';
import { PagingReviewResponse } from './entities/paging-review.entity';
import { PagingReviewInput } from './dto/paging-review.input';
import { FindReviewInput } from './dto/find-review.input';
import { RequireActiveGuard } from 'src/guard/require-active.guard';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => Review)
  @UseGuards(JwtAccessAuthGuard, RequireActiveGuard)
  createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.reviewsService.create(createReviewInput, user.id);
  }

  @Query(() => PagingReviewResponse, { name: 'reviews' })
  @UseGuards(JwtAdminAuthGuard)
  findAll(@Args('pagingReviewInput') pagingReviewInput: PagingReviewInput) {
    return this.reviewsService.findMany(pagingReviewInput);
  }

  @Query(() => PagingReviewResponse, { name: 'reviewsByProduct' })
  findManyByProductId(
    @Args('pagingReviewInput') pagingReviewInput: PagingReviewInput,
    @Args('productId') productId: string,
  ) {
    return this.reviewsService.findMany(
      pagingReviewInput,
      undefined,
      productId,
      true,
    );
  }

  @Query(() => Review, { name: 'review' })
  findOne(@Args('findReviewInput') findReviewInput: FindReviewInput) {
    return this.reviewsService.findOne(
      findReviewInput.ownerId,
      findReviewInput.productId,
    );
  }

  @Query(() => PagingReviewResponse, { name: 'historiesReview' })
  @UseGuards(JwtAccessAuthGuard)
  historiesReview(
    @Args('pagingReviewInput') pagingReviewInput: PagingReviewInput,
    @CurrentUser() user: CurrentUserInterface,
  ) {
    return this.reviewsService.findMany(pagingReviewInput, user.id);
  }

  @Mutation(() => Boolean, { name: 'updateStatusReview' })
  @UseGuards(JwtAdminAuthGuard)
  updateStatusReview(
    @Args('updateStatusReviewInput') updateStatusReviewInput: UpdateReviewInput,
  ) {
    return this.reviewsService.update(
      updateStatusReviewInput.productId,
      updateStatusReviewInput.ownerId,
      updateStatusReviewInput,
    );
  }

  @ResolveField(() => User, { name: 'owner' })
  getProduct(@Parent() review: Review) {
    return this.usersService.findOne(review.ownerId);
  }
}
