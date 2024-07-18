import {
  Field,
  Float,
  GraphQLISODateTime,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';

@ObjectType()
export class OrderItem {
  @Field()
  orderId: string;

  @Field()
  productId: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => Product, { name: 'product' })
  product: Product;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
