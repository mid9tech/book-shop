import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const ChangePasswordMutation = gql`
  mutation ChangePassword($changePasswordInput: ChangePasswordInput!) {
    changePassword(changePasswordInput: $changePasswordInput)
  }
`;
