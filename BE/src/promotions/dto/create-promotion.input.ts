import { InputType, Field } from '@nestjs/graphql';
import { IsDateString, IsEnum } from 'class-validator';
import { PROMOTION_LEVEL, PROMOTION_TYPE } from 'src/utils/const';

@InputType()
export class CreatePromotionInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => String)
  @IsEnum(PROMOTION_LEVEL)
  level: PROMOTION_LEVEL;

  @Field(() => String)
  @IsEnum(PROMOTION_TYPE)
  type: PROMOTION_TYPE;

  @Field({ nullable: true })
  banner: string;

  @Field({ nullable: true })
  discountPercentage: number;

  @Field({ nullable: true })
  discountValue: number;

  @Field({ nullable: true })
  minValue: number;

  @Field()
  @IsDateString()
  startDate: string;

  @Field()
  @IsDateString()
  endDate: string;
}
