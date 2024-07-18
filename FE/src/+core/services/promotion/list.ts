import { PromotionsQuery } from "@/+core/definegql";
import { MyGraphqlResponse } from "@/+core/types/response";
import { MyApolloClient } from "@/lib/apolloClient";
import { GraphQLError } from "graphql";

export async function ListPromotionService(): Promise<MyGraphqlResponse> {
  try {
    const { data, errors } = await MyApolloClient.query({
      query: PromotionsQuery,
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
          error.message || "An error occurred during searchProduct."
        ),
      ],
    };
  }
}
