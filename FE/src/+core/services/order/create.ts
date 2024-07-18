import { CreateOrderMutation } from "@/+core/definegql";
import { CreateOrderInput } from "@/+core/interfaces";
import { MyGraphqlResponse } from "@/+core/types/response";
import { MyApolloClient } from "@/lib/apolloClient";
import { GraphQLError } from "graphql";

export async function PlaceAnOrderService(
  accessToken: string,
  createOrderInput: CreateOrderInput
): Promise<MyGraphqlResponse> {
  try {
    const { data, errors } = await MyApolloClient.mutate({
      mutation: CreateOrderMutation,
      variables: { createOrderInput: createOrderInput },
      context: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    if (errors && errors.length) {
      return {
        data: null,
        errors: errors.map(
          (error: GraphQLError) => new GraphQLError(error.message)
        ),
      };
    }

    return {
      data: data || null,
      errors: null,
    };
  } catch (error: any) {
    return {
      data: null,
      errors: [
        new GraphQLError(
          error.message || "An error occurred during place an order."
        ),
      ],
    };
  }
}
