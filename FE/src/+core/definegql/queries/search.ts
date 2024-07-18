import { gql } from "@apollo/client";
export const SearchProductQuery = gql`
  query Products($searchConditionInput: SearchConditionInput!) {
    products(searchConditionInput: $searchConditionInput) {
      page
      limit
      total
      data {
        id
        name
        description
        categoryId
        publisherId
        price
        priceSale
        isOnSale
        avatar
        author
        images
        status
      }
    }
  }
`;
