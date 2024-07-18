import { InputType, Field, ID } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { STATUS_PRODUCT } from 'src/utils/const';

@InputType()
export class UpdateProductInput {
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

  @Field(() => [String], { nullable: true })
  author: string[];

  @Field(() => [String], { nullable: true })
  images: string[];

  @Field(() => String, { nullable: true })
  @IsEnum(STATUS_PRODUCT)
  status: STATUS_PRODUCT;
}
