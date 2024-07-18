import { InputType, Field } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { ABOUT_TYPE } from 'src/utils/const';

@InputType()
export class CreateAboutInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  image: string;

  @Field()
  @IsEnum(ABOUT_TYPE)
  type: ABOUT_TYPE;
}
