import { APIGatewayProxyEventV2 } from "aws-lambda";

import * as trpc from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { CreateAWSLambdaContextOptions } from "@trpc/server/adapters/aws-lambda";

import { SessionToken } from "../base/token/session-token";
import { AccessToken } from "../base/token/access-token";

const cookieParser = (cookieString: string[] = []) => {
  const cookieObject: Record<string, string> = cookieString.reduce(
    (acc, cookie) => {
      const parts = cookie.trim().split("=") as string[];

      if (parts.length !== 2) {
        return acc;
      }

      const name = parts[0];
      const value = decodeURIComponent(parts[1]);

      return {
        ...acc,
        [name]: value,
      };
    },
    {}
  );

  return {
    get(key: string) {
      return key in cookieObject ? cookieObject[key] : undefined;
    },
  };
};

const authorizationParser = (authorization?: string) => {
  if (!authorization) {
    return null;
  }

  const accessTokenParts = authorization.split(" ");
  if (accessTokenParts.length !== 2 || accessTokenParts[0] !== "Bearer") {
    return null;
  }

  return accessTokenParts[1];
};

export const createContext = ({
  event,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>): any => {
  try {
    const cookies = cookieParser(event.cookies);
    const sessionTokenValue = cookies.get("session-token");
    if (!sessionTokenValue) {
      return {};
    }

    // Verify session token
    const sessionToken = new SessionToken(sessionTokenValue);
    if (!sessionToken.payload) {
      throw new Error("session token not valid.");
    }

    // Verify authorization header
    const authorization = authorizationParser(event.headers?.authorization);
    if (!authorization) {
      throw new Error("authorization not valid.");
    }

    // Verify access token
    const accessToken = new AccessToken(authorization);
    if (!accessToken.payload) {
      throw new Error("access token not valid.");
    }

    return {
      session: {
        userID: accessToken.payload.userID,
      },
    };
  } catch (err) {
    console.log(event, "CONTEXT ERROR [", err, "]");

    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
