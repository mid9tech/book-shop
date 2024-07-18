import { RefreshATMutation } from "@/+core/definegql";
import { MyGraphqlResponse } from "@/+core/types/response";
import { MyApolloClient } from "@/lib/apolloClient";
import { GraphQLError } from "graphql";

export async function RefreshAccessToken(
  refreshToken: string,
  isCache: boolean = true
): Promise<MyGraphqlResponse> {
  try {
    const { data, errors } = await MyApolloClient.mutate({
      mutation: RefreshATMutation,
      context: {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
        ...(!isCache ? { fetchPolicy: "no-cache" } : {}),
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
          error.message || "An error occurred during refreshTk."
        ),
      ],
    };
  }
}
