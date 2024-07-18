import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const RegisterMutation = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput)
  }
`;
