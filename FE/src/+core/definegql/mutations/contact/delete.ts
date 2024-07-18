import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const DeleteContactMutation = gql`
  mutation DeleteContact($id: String!) {
    deleteContact(id: $id)
  }
`;
