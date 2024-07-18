import { LoginMutation } from "@/+core/definegql";
import { LoginInput } from "@/+core/interfaces";
import { MyGraphqlResponse } from "@/+core/types/response";
import { MyApolloClient } from "@/lib/apolloClient";
import { GraphQLError } from "graphql";

export async function Login(
  email: string,
  password: string,
  isRememberMe: boolean
): Promise<MyGraphqlResponse> {
  const loginInput: LoginInput = {
    email: email,
    password: password,
    isRememberMe: isRememberMe,
  };

  try {
    const { data, errors } = await MyApolloClient.mutate({
      mutation: LoginMutation,
      variables: { loginInput: loginInput },
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
        new GraphQLError(error.message || "An error occurred during login."),
      ],
    };
  }
}
