import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const GetCartQuery = gql`
  query GetCart {
    getCart {
      productId
      quantity
      product {
        id
        name
        price
        priceSale
        isOnSale
        avatar
      }
    }
  }
`;
