import { AddToCartMutation } from "@/+core/definegql";
import { MyGraphqlResponse } from "@/+core/types/response";
import { MyApolloClient } from "@/lib/apolloClient";
import { GraphQLError } from "graphql";

export async function AddToCartService(
  accessToken: string,
  productId: string,
  quantity: number
): Promise<MyGraphqlResponse> {
  try {
    const { data, errors } = await MyApolloClient.mutate({
      mutation: AddToCartMutation,
      context: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      variables: {
        addProductInput: {
          productId: productId,
          quantity: quantity,
        },
      },
    });

    if (errors) {
      return {
        data: null,
        errors: errors.map((error: any) => new GraphQLError(error.message)),
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
          error.message || "An error occurred during add to cart."
        ),
      ],
    };
  }
}
