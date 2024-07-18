// graphql/mutations.js
import { gql } from "@apollo/client";

export const UpdateStatusOrderMutation = gql`
  mutation UpdateStatusOrder($updateOrderInput: UpdateOrderInput!) {
    updateStatusOrder(updateOrderInput: $updateOrderInput)
  }
`;
