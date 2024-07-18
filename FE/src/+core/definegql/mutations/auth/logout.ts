import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const LogoutMutation = gql`
  mutation Logout {
    logout {
      result
    }
  }
`;
