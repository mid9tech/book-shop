"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { MyApolloClient } from "@/lib/apolloClient";
interface Props {
  children: ReactNode;
}

const MyProvider = ({ children }: Props) => {
  return (
    <ApolloProvider client={MyApolloClient}>
      <SessionProvider>{children}</SessionProvider>
    </ApolloProvider>
  );
};

export default MyProvider;
