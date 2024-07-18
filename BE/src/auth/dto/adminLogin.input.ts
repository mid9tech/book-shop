import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AdminLoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
