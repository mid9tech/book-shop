import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class OrderItemInput {
  @Field()
  productId: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  quantity: number;
}
