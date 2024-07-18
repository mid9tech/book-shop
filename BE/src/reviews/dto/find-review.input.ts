import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindReviewInput {
  @Field()
  ownerId: string;

  @Field()
  productId: string;
}
