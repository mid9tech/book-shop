import { gql } from "@apollo/client";
export const PromotionsQuery = gql`
  query Promotions($isAvailablePromotions: Boolean!) {
    promotions(isAvailablePromotions: $isAvailablePromotions) {
      id
      name
      description
      level
      type
      banner
      discountPercentage
      discountValue
      minValue
      startDate
      endDate
    }
  }
`;
