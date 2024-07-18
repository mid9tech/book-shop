// graphql/mutations.js
import { gql } from "@apollo/client";

export const CreateReviewMutation = gql`
  mutation CreateReview($createReviewInput: CreateReviewInput!) {
    createReview(createReviewInput: $createReviewInput) {
      productId
    }
  }
`;
