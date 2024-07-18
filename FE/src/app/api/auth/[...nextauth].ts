import { Login, RefreshAccessToken } from "@/+core/services";
import { GetProfile } from "@/+core/services/user/getProfile";
import { NEXTAUTH_SECRET } from "@/lib/constants";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const { data } = await RefreshAccessToken(token.refreshToken, false);

    if (data?.refreshAccessToken) {
      return {
        ...token,
        accessToken: data.refreshAccessToken.accessToken,
        expired_accessToken: data.refreshAccessToken.expired_accessToken,
      };
    }
  } catch (err) {
    // Optionally handle token refresh failure
  }

  return { ...token, error: "RefreshAccessTokenError" };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        isRememberMe: { label: "Remember Me", type: "checkbox" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const { data, errors } = await Login(
          credentials.email,
          credentials.password,
          credentials.isRememberMe === "true"
        );

        if (data?.login) {
          return data.login;
        }

        if (errors) {
          throw errors[0];
        }

        return null;
      },
    }),

    /* CredentialsProvider({
      name: "OAuthGoogleCustomCredentials",
      credentials: {
        accessToken: { label: "accessToken", type: "text" },
        expired_accessToken: { label: "expired_accessToken", type: "text" },
        refreshToken: { label: "refreshToken", type: "text" },
        expired_refreshToken: { label: "expired_refreshToken", type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials?.accessToken || !credentials?.refreshToken)
          return null;

        const result = {
          id: 'unique-id',
          accessToken: credentials.accessToken,
          expired_accessToken: credentials.expired_accessToken,
          refreshToken: credentials.refreshToken,
          expired_refreshToken: credentials.expired_refreshToken,
        };

        return result;
      },
    }), */
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      // access token not expired
      if (Date.now() < token.expired_accessToken) {
        return token;
      }

      return await refreshToken(token);
    },

    async session({ session, token }) {
      try {
        const { data } = await GetProfile(token.accessToken, false);

        session.user = data?.getProfile ?? null;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      } catch (err) {
        console.error("Error fetching profile", err);
        session.error = "SessionFetchError";
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export default handler;
