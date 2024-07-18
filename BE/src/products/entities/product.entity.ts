import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { IsEnum, Max } from 'class-validator';
import { STATUS_PRODUCT } from 'src/utils/const';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  categoryId: string;

  @Field({ nullable: true })
  publisherId: string;

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  priceSale: number;

  @Field({ nullable: true })
  isOnSale: boolean;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  @Max(5)
  rate: number;

  @Field({ nullable: true })
  ratingCount: number;

  @Field(() => [String], { nullable: true })
  author: string[];

  @Field(() => [String], { nullable: true })
  images: string[];

  @Field(() => String, { nullable: true })
  @IsEnum(STATUS_PRODUCT)
  status: STATUS_PRODUCT;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
