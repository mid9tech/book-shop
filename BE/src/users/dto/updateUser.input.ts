import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsEnum } from 'class-validator';
import { GENDER } from 'src/utils/const';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  @IsDate({ message: 'Please enter right date' })
  birthDate: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  @IsEnum(GENDER)
  gender: string;
}
