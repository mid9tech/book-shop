import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const GetContactsQuery = gql`
  query Contacts {
    contacts {
      id
      fullName
      district
      province
      phoneNumber
      wards
      detailAddress
    }
  }
`;
