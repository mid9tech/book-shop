import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ProductQuantity {
  @Field()
  productId: string;

  @Field()
  quantity: number;
}

@InputType()
export class RecommendInput {
  @Field(() => [ProductQuantity], { defaultValue: [] })
  products: ProductQuantity[];

  @Field()
  totalValue: number;
}
