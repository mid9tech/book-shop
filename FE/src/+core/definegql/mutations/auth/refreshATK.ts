import { gql } from "@apollo/client";

export const RefreshATMutation = gql`
  mutation RefreshAccessToken {
    refreshAccessToken {
      refreshToken
      expired_accessToken
    }
  }
`;
