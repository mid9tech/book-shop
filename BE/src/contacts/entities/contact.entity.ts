import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType()
export class Contact {
  @Field(() => ID)
  id: string;

  @Field()
  ownerId: string;

  @Field()
  fullName: string;

  @Field()
  district: string;

  @Field()
  province: string;

  @Field()
  phoneNumber: string;

  @Field()
  wards: string;

  @Field()
  detailAddress: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
