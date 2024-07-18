import { GraphQLError } from "graphql";

export type MyGraphqlResponse = {
  data: any | null;
  errors: Array<GraphQLError> | null;
};
