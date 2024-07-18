import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdatePublisherInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  status: boolean;
}
