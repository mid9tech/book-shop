import { CreateReviewMutation } from "@/+core/definegql";
import { CreateReviewInput } from "@/+core/interfaces";
import { MyGraphqlResponse } from "@/+core/types/response";
import { MyApolloClient } from "@/lib/apolloClient";
import { GraphQLError } from "graphql";

export async function CreateReviewService(
  accessToken: string,
  createReviewInput: CreateReviewInput
): Promise<MyGraphqlResponse> {
  try {
    const { data, errors } = await MyApolloClient.mutate({
      mutation: CreateReviewMutation,
      variables: { createReviewInput: createReviewInput },
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
          error.message || "An error occurred during create review."
        ),
      ],
    };
  }
}
