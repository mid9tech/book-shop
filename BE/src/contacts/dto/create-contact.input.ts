import { InputType, Field } from '@nestjs/graphql';
import { IsPhoneNumber } from 'class-validator';

@InputType()
export class CreateContactInput {
  @Field()
  fullName: string;

  @Field()
  district: string;

  @Field()
  province: string;

  @Field()
  @IsPhoneNumber()
  phoneNumber: string;

  @Field()
  wards: string;

  @Field()
  detailAddress: string;
}
