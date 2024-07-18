import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddProductInput {
  @Field()
  productId: string;

  @Field()
  quantity: number;
}
