import { gql } from "@apollo/client";

export const RecommendQuery = gql`
  query Recommend($recommendInput: RecommendInput!) {
    recommend(recommendInput: $recommendInput) {
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
      status
      createdAt
      updatedAt
    }
  }
`;
