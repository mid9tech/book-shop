import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const UpdateContactMutation = gql`
  mutation UpdateContact($updateContactInput: UpdateContactInput!) {
    updateContact(updateContactInput: $updateContactInput)
  }
`;
