import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const VerifyMutation = gql`
  mutation VerifyUser($otp: String!) {
    verifyUser(otp: $otp)
  }
`;
