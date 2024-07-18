import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const UpdateProfileMutation = gql`
  mutation UpdateProfile($updateUserInput: UpdateUserInput!) {
    updateProfile(updateUserInput: $updateUserInput) {
      id
      email
      birthDate
      status
      avatar
      phoneNumber
      gender
      firstName
      lastName
    }
  }
`;
