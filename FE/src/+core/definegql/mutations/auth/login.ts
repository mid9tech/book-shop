import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const LoginMutation = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      accessToken
      expired_accessToken
      refreshToken
      expired_refreshToken
    }
  }
`;
