import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const RemoveProductFromCart = gql`
  mutation RemoveProductFromCart($productId: String!) {
    removeProductFromCart(productId: $productId)
  }
`;
