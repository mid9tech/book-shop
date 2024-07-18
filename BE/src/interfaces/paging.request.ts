import { Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class PagingRequest {
  @Field(() => Int, { nullable: true })
  page: number;

  @Field(() => Int, { nullable: true })
  limit: number;
}
