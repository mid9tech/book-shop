import { gql } from "@apollo/client";

export const ReviewsByProductQuery = gql`
  query ReviewsByProduct(
    $pagingReviewInput: PagingReviewInput!
    $productId: String!
  ) {
    reviewsByProduct(
      pagingReviewInput: $pagingReviewInput
      productId: $productId
    ) {
      page
      limit
      total
      countOneStar
      countTwoStar
      countThreeStar
      countFourStar
      countFiveStar
      data {
        productId
        title
        content
        rate
        images
        createdAt
        owner {
          firstName
          lastName
          avatar
        }
      }
    }
  }
`;
