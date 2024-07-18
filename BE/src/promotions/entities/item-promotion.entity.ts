import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PromotionItem {
  @Field()
  productId: string;

  @Field()
  promotionId: string;

  @Field()
  quantity: number;
}
