import { InputType, Field, ID } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';
import { PROMOTION_LEVEL, PROMOTION_TYPE } from 'src/utils/const';

@InputType()
export class UpdatePromotionInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @IsEnum(PROMOTION_LEVEL)
  level?: PROMOTION_LEVEL;

  @Field({ nullable: true })
  @IsEnum(PROMOTION_TYPE)
  type?: PROMOTION_TYPE;

  @Field({ nullable: true })
  banner?: string;

  @Field({ nullable: true })
  discountPercentage?: number;

  @Field({ nullable: true })
  discountValue?: number;

  @Field({ nullable: true })
  minValue?: number;

  @Field({ nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  endDate?: string;

  @Field({ nullable: true })
  status?: boolean;
}
