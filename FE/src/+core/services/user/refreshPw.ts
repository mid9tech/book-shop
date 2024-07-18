import {
  RefreshPasswordMutation,
} from "@/+core/definegql";
import { RefreshPasswordInput } from "@/+core/interfaces";
import { MyGraphqlResponse } from "@/+core/types/response";
import { MyApolloClient } from "@/lib/apolloClient";
import { GraphQLError } from "graphql";

export async function RefreshPasswordService(
  userRefreshPasswordInput: RefreshPasswordInput
): Promise<MyGraphqlResponse> {
  try {
    const { data, errors } = await MyApolloClient.mutate({
      mutation: RefreshPasswordMutation,
      variables: { userRefreshPasswordInput: userRefreshPasswordInput },
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
          error.message || "An error occurred refresh password."
        ),
      ],
    };
  }
}
