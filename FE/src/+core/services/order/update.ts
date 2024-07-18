import { UpdateStatusOrderMutation } from "@/+core/definegql";
import { UpdateOrderInput } from "@/+core/interfaces";
import { MyGraphqlResponse } from "@/+core/types/response";
import { MyApolloClient } from "@/lib/apolloClient";
import { GraphQLError } from "graphql";

export async function UpdateStatusOrderService(
  accessToken: string,
  updateStatusOrderInput: UpdateOrderInput
): Promise<MyGraphqlResponse> {
  try {
    const { data, errors } = await MyApolloClient.mutate({
      mutation: UpdateStatusOrderMutation,
      variables: { updateOrderInput: updateStatusOrderInput },
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
          error.message || "An error occurred during update status order."
        ),
      ],
    };
  }
}
