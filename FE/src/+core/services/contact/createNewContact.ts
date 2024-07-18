import { CreateContactMutation } from "@/+core/definegql";
import { ContactInterface } from "@/+core/interfaces/contact";
import { MyGraphqlResponse } from "@/+core/types/response";
import { MyApolloClient } from "@/lib/apolloClient";
import { GraphQLError } from "graphql";

export async function CreateNewContactService(
  accessToken: string,
  createNewContactInput: ContactInterface
): Promise<MyGraphqlResponse> {
  try {
    const { data, errors } = await MyApolloClient.mutate({
      mutation: CreateContactMutation,
      variables: {
        createContactInput: createNewContactInput,
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
          error.message || "An error occurred during create new contact."
        ),
      ],
    };
  }
}
