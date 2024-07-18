import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const GetCategoryQuery = gql`
  query Categories {
    categories {
      id
      name
      type
      childs {
        id
        name
        type
        parentId
      }
    }
  }
`;
