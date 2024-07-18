import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const GetPublisherQuery = gql`
  query Publishers {
    publishers {
      id
      name
      description
      avatar
      status
    }
  }
`;
