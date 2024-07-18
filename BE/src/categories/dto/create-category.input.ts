import { InputType, Field } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { CATEGORY_TYPE } from 'src/utils/const';

@InputType()
export class CreateCategoryInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  @IsEnum(CATEGORY_TYPE)
  type: CATEGORY_TYPE;

  @Field({ nullable: true })
  parentId: string;
}
