import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, Max, Min } from 'class-validator';
import { PagingRequest } from 'src/interfaces';
import { REVIEW_SORT } from 'src/utils/const';

@InputType()
export class PagingReviewInput extends PagingRequest {
  @Field({ nullable: true })
  @Min(1)
  @Max(5)
  rate?: number;

  @Field({ nullable: true })
  @IsEnum(REVIEW_SORT)
  sort?: REVIEW_SORT;
}
