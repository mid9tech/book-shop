import { STATUS_ORDER } from 'src/utils/const';
import { InputType, Field, ID } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';

@InputType()
export class UpdateOrderInput {
  @Field(() => ID)
  id: string;

  @Field()
  @IsEnum(STATUS_ORDER)
  status: STATUS_ORDER;

  @Field({ nullable: true })
  reason: string;
}
