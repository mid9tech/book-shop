import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const AddToCartMutation = gql`
  mutation AddProductToCart($addProductInput: AddProductInput!) {
    addProductToCart(addProductInput: $addProductInput)
  }
`;
