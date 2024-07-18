import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const GetProductQuery = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      name
      description
      categoryId
      publisherId
      price
      priceSale
      isOnSale
      avatar
      rate
      ratingCount
      author
      images
      status
    }
  }
`;
