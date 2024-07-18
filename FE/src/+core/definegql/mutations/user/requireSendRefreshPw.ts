import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const RequireSendEmailRefreshPasswordMutation = gql`
  mutation RequireSendEmailResetPassword($email: String!) {
    requireSendEmailResetPassword(email: $email)
  }
`;
