import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateAboutInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  status: boolean;
}
