import { InputType, Field, ID } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { CATEGORY_TYPE } from 'src/utils/const';

@InputType()
export class UpdateCategoryInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  @IsEnum(CATEGORY_TYPE)
  type: CATEGORY_TYPE;

  @Field({ nullable: true })
  parentId: string;

  @Field({ nullable: true })
  status: boolean;
}
