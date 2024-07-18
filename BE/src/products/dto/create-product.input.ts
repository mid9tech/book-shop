import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  categoryId: string;

  @Field()
  publisherId: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  avatar: string;

  @Field(() => [String], { nullable: true })
  author: string[];

  @Field(() => [String], { nullable: true })
  images: string[];
}
