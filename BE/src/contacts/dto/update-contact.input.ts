import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateContactInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  fullName: string;

  @Field({ nullable: true })
  district: string;

  @Field({ nullable: true })
  province: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  wards: string;

  @Field({ nullable: true })
  detailAddress: string;
}
