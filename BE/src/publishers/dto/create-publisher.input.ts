import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePublisherInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  avatar: string;

  @Field()
  address: string;

  @Field()
  phoneNumber: string;
}
