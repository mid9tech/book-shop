import { UpdateProfileMutation } from "@/+core/definegql";
import { UpdateUserInput } from "@/+core/interfaces";
import { MyGraphqlResponse } from "@/+core/types/response";
import { MyApolloClient } from "@/lib/apolloClient";
import { GraphQLError } from "graphql";

export async function UpdateProfileService(
  accessToken: string,
  updateUserInput: UpdateUserInput
): Promise<MyGraphqlResponse> {
  try {
    const { data, errors } = await MyApolloClient.mutate({
      mutation: UpdateProfileMutation,
      variables: {
        updateUserInput: updateUserInput,
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
          error.message || "An error occurred during update Profile."
        ),
      ],
    };
  }
}
