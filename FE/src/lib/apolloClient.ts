import { BACKEND_URL } from "@/lib/constants";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const MyApolloClient = new ApolloClient({
  uri: `${BACKEND_URL}/graphql`,
  cache: new InMemoryCache(),
});
