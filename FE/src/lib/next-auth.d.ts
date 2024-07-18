// Type declarations for NextAuth and JWT

import { USER_STATUS, USER_GENDER } from "@/+core/enums";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      avatar: string;
      status: USER_STATUS;
      phoneNumber: string;
      gender: USER_GENDER;
      birthDate: string;
    } | null;
    accessToken: string;
    refreshToken: string;
    error?: string;
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    expired_accessToken: number;
    refreshToken: string;
    expired_refreshToken: number;
    error?: string;
  }
}
