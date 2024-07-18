import { InputType, Field } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class CreateReviewInput {
  @Field()
  productId: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  @Min(1)
  @Max(5)
  rate: number;

  @Field(() => [String], { nullable: true, defaultValue: [] })
  images: string[];
}
