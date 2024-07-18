import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const CreateContactMutation = gql`
  mutation CreateContact($createContactInput: CreateContactInput!) {
    createContact(createContactInput: $createContactInput) {
      id
      ownerId
      fullName
      district
      province
      phoneNumber
      wards
      detailAddress
    }
  }
`;
