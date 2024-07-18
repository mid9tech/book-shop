import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const RefreshPasswordMutation = gql`
  mutation RefreshUserPassword(
    $userRefreshPasswordInput: UserRefreshPasswordInput!
  ) {
    refreshUserPassword(userRefreshPasswordInput: $userRefreshPasswordInput)
  }
`;
