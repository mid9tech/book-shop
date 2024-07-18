// graphql/mutations.js
import { gql } from "@apollo/client";

export const CreateOrderMutation = gql`
  mutation CreateOrder($createOrderInput: CreateOrderInput!) {
    createOrder(createOrderInput: $createOrderInput) {
      id
    }
  }
`;
