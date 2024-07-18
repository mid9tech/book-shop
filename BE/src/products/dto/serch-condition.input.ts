import { InputType, Field } from '@nestjs/graphql';
import { PagingRequest } from 'src/interfaces';

@InputType()
export class SearchConditionInput extends PagingRequest {
  @Field({ nullable: true })
  keyword?: string;

  @Field(() => [String], { nullable: true })
  categoryIds?: string[];

  @Field(() => [String], { nullable: true })
  publisherIds?: string[];

  @Field({ nullable: true })
  isOnSale?: boolean;

  @Field({ nullable: true })
  minPrice?: number;

  @Field({ nullable: true })
  maxPrice?: number;

  @Field({ nullable: true })
  rate?: number;
}
