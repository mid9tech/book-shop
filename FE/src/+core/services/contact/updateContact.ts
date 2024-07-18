import { UpdateContactMutation } from "@/+core/definegql";
import { ContactInterface } from "@/+core/interfaces/contact";
import { MyGraphqlResponse } from "@/+core/types/response";
import { MyApolloClient } from "@/lib/apolloClient";
import { GraphQLError } from "graphql";

export async function UpdateContactService(
  accessToken: string,
  updateContactInput: ContactInterface
): Promise<MyGraphqlResponse> {
  try {
    const { data, errors } = await MyApolloClient.mutate({
      mutation: UpdateContactMutation,
      variables: {
        updateContactInput: updateContactInput,
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
          error.message || "An error occurred during update contact."
        ),
      ],
    };
  }
}
