import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LogoutResponse {
  @Field({ nullable: true })
  result: boolean;
}
