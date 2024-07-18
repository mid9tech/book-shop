import { ObjectType, Field, GraphQLISODateTime, ID } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { CATEGORY_TYPE } from 'src/utils/const';

@ObjectType()
export class CategoryChild {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  @IsEnum(CATEGORY_TYPE)
  type: string;

  @Field({ nullable: true })
  parentId: string;

  @Field()
  status: boolean;

  @Field()
  createdBy: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}

@ObjectType()
export class Category {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  @IsEnum(CATEGORY_TYPE)
  type: string;

  @Field()
  status: boolean;

  @Field()
  createdBy: string;

  @Field(() => [CategoryChild], { defaultValue: [] })
  childs: CategoryChild[];

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
