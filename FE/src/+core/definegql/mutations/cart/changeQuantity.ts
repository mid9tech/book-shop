import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const UpdateProductQuantity = gql`
  mutation UpdateProductQuantity(
    $updateProductQuantityInput: AddProductInput!
  ) {
    updateProductQuantity(
      updateProductQuantityInput: $updateProductQuantityInput
    )
  }
`;
