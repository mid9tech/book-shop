import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { USER_STATUS } from 'src/utils/const';

@InputType()
export class UpdateUserStatusInput {
  @Field(() => ID)
  id: string;

  @Field()
  @IsEnum(USER_STATUS)
  status: USER_STATUS;
}
