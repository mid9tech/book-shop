import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';

@ObjectType()
export class CartItem {
  @Field(() => ID)
  productId: string;

  @Field()
  quantity: number;

  @Field(() => Product, { defaultValue: null })
  product: Product;
}
