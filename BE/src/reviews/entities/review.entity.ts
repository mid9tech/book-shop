import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Review {
  @Field()
  productId: string;

  @Field()
  ownerId: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  @Min(1)
  @Max(5)
  rate: number;

  @Field(() => User, { name: 'owner' })
  owner: User;

  @Field(() => [String], { nullable: true, defaultValue: [] })
  images: string[] = [];

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
