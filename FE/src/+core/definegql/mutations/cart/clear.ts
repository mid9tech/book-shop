import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const ClearCartMutation = gql`
  mutation ClearCart {
    clearCart
  }
`;
