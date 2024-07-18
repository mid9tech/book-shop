import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { ABOUT_TYPE } from 'src/utils/const';

@ObjectType()
export class About {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  image: string;

  @Field()
  status: boolean;

  @Field()
  @IsEnum(ABOUT_TYPE)
  type: ABOUT_TYPE;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}

@ObjectType()
export class RenderAbout {
  @Field(() => [About], { defaultValue: [] })
  main: About[];

  @Field(() => [About], { defaultValue: [] })
  child: About[];

  @Field(() => [About], { defaultValue: [] })
  qAndA: About[];
}
