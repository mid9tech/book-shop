import { ApolloServerErrorCode } from '@apollo/server/errors';
import * as dotenv from 'dotenv';
dotenv.config();

export enum GRAPHQL_CODE_ERROR {
  InternalServerError = ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
  BadRequest = ApolloServerErrorCode.BAD_REQUEST,
  UnAuthorizedError = 'UNAUTHORIZED_ERROR',
  DBError = 'DB_ERROR',
  ForbiddenError = 'FORBIDDEN_ERROR',
  NotFound = 'NOTFOUND_ERROR',
}

export enum USER_STATUS {
  ACTIVE = 'ACTIVE',
  BANNED = 'BANNED',
  UNVERIFIED = 'UNVERIFIED',
  DELETED = 'DELETED',
}

export enum ROLE {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}

export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNDEFINED = 'UNDEFINED',
}

export enum TYPE_KEY {
  REFRESH_PASSWORD = 'refresh_password',
}

export enum CATEGORY_TYPE {
  CHILDREN = 'CHILDREN',
  PARENT = 'PARENT',
}

export enum STATUS_ORDER {
  PENDING = 'PENDING',
  ON_SHIPPING = 'ON_SHIPPING',
  CANCEL = 'CANCEL',
  DONE = 'DONE',
  RETURN = 'RETURN',
}

export enum STATUS_PRODUCT {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
  INACTIVE = 'INACTIVE',
}

export enum ABOUT_TYPE {
  Q_AND_A = 'Q_AND_A',
  MAIN = 'MAIN',
  CHILD = 'CHILD',
}

export enum PAYMENT_METHOD {
  COD = 'COD',
  CREDIT_CARD = 'CREDIT_CARD',
}

export enum PROMOTION_LEVEL {
  ORDER = 'ORDER',
  ITEM = 'ITEM',
}

export enum PROMOTION_TYPE {
  PERCENT = 'PERCENT',
  VALUE = 'VALUE',
}

export function GenKey(userId: string, typeKey: string): string {
  return `${userId}:${typeKey}`;
}

export const CLIENT_SITE_DOMAIN = process.env.CLIENT_SITE_DOMAIN;
export const SITE_PORT = process.env.SITE_PORT || 8080;

export const JWT_CONST = {
  ACCESS_SECRET: process.env.SECRET_ACCESS_TOKEN_KEY,
  REFRESH_SECRET: process.env.SECRET_ACCESS_REFRESH_KEY,
  ACCESS_EXPIRED: () => {
    return 60 * 60 * 1000 + new Date().getTime();
  }, // mini seconds one hour from now (integer)
  REFRESH_EXPIRED: () => {
    return 60 * 60 * 24 * 30 * 1000 + new Date().getTime();
  }, // mini seconds one month from now
  ACCESS_EXPIRED_GENERATION: 60 * 60,
  REFRESH_EXPIRED_GENERATION: 60 * 60 * 24 * 30,
};

export const SITE_DOMAIN = process.env.SITE_DOMAIN;

export enum REVIEW_SORT {
  OLDEST = 'OLDEST',
  LATEST = 'LATEST',
}
