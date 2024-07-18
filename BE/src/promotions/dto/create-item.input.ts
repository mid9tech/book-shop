import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePromotionItemInput {
  @Field()
  productId: string;

  @Field()
  promotionId: string;

  @Field()
  quantity: number;
}
