import { gql } from "@apollo/client";

// Define the GraphQL mutation with variable definitions
export const HistoriesOrderQuery = gql`
  query HistoriesOrder($pagingOrderInput: PagingOrderInput!) {
    historiesOrder(pagingOrderInput: $pagingOrderInput) {
      page
      limit
      total
      data {
        id
        isPaid
        totalPrice
        priceToPay
        reducePrice
        paymentMethod
        status
        createdAt
        updatedAt
        items {
          quantity
          price
          product {
            id
            name
            avatar
            rate
          }
        }
      }
    }
  }
`;

export const DetailOrderQuery = gql`
  query DetailOrder($id: String!) {
    order(id: $id) {
      id
      totalPrice
      isPaid
      priceToPay
      reducePrice
      paymentMethod
      status
      contact {
        fullName
        district
        province
        phoneNumber
        detailAddress
        wards
      }
      promotion {
        name
        level
        description
        type
        discountPercentage
        discountValue
        minValue
        endDate
        startDate
      }
      items {
        price
        quantity
        product {
          name
          avatar
          rate
        }
      }
    }
  }
`;
