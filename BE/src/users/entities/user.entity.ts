import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { GENDER, USER_STATUS } from 'src/utils/const';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field()
  email: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  birthDate: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  @IsEnum(GENDER, { each: true })
  gender: string;

  @Field({ nullable: true })
  avatar: string;

  @Field(() => String)
  @IsEnum(USER_STATUS)
  status: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
