import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserRefreshPasswordInput {
  @Field()
  id: string;

  @Field()
  token: string;

  @Field()
  password: string;
}
