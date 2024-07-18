import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const GetProfileQuery = gql`
  query GetProfile {
    getProfile {
      id
      email
      birthDate
      status
      phoneNumber
      gender
      firstName
      lastName
      avatar
      createdAt
      updatedAt
    }
  }
`;
