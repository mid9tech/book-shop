import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateReviewInput {
  @Field()
  ownerId: string;

  @Field()
  productId: string;

  @Field()
  status: boolean;
}
