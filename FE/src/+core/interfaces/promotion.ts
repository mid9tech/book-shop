import { PROMOTION_LEVEL, PROMOTION_TYPE } from "../enums";

export interface PromotionType {
  id: string;
  name: string;
  description: string;
  level?: PROMOTION_LEVEL;
  type?: PROMOTION_TYPE;
  banner?: string;
  discountPercentage?: number;
  discountValue?: number;
  minValue?: number;
  startDate?: Date;
  endDate?: Date;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
