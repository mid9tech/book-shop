import { UpdateProductQuantity } from "@/+core/definegql";
import { CartInput } from "@/+core/interfaces";
import { MyGraphqlResponse } from "@/+core/types/response";
import { MyApolloClient } from "@/lib/apolloClient";
import { GraphQLError } from "graphql";

export async function UpdateProductQuantityInCartService(
  accessToken: string,
  updateProductQuantityInput: CartInput
): Promise<MyGraphqlResponse> {
  try {
    const { data, errors } = await MyApolloClient.mutate({
      mutation: UpdateProductQuantity,
      variables: {
        updateProductQuantityInput: updateProductQuantityInput,
      },
      context: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
          error.message ||
            "An error occurred during update product quantity in cart."
        ),
      ],
    };
  }
}
