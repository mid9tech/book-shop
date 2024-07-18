import { ObjectType, Field } from '@nestjs/graphql';
import { PagingResponse } from 'src/interfaces/paging.response';
import { Review } from './review.entity';

@ObjectType()
export class PagingReviewResponse extends PagingResponse {
  @Field(() => [Review], { defaultValue: [] })
  data: Review[];

  @Field({ defaultValue: 0 })
  countOneStar?: number;

  @Field({ defaultValue: 0 })
  countTwoStar?: number;

  @Field({ defaultValue: 0 })
  countThreeStar?: number;

  @Field({ defaultValue: 0 })
  countFourStar?: number;

  @Field({ defaultValue: 0 })
  countFiveStar?: number;
}
