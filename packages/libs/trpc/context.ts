import { APIGatewayProxyEventV2 } from "aws-lambda";

import * as trpc from "@trpc/server";
import { CreateAWSLambdaContextOptions } from "@trpc/server/adapters/aws-lambda";
import { JWT } from "../base/hash/jwt.hash";
import { Config } from "sst/node/config";
import { TRPCError } from "@trpc/server";

const cookieParser = (cookieString: string[] = []) => {
  const cookieObject: Record<string, string> = cookieString.reduce(
    (acc, cookie) => {
      const parts = cookie.trim().split("=");

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

export const createContext = ({
  event,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>): any => {
  try {
    const cookies = cookieParser(event.cookies);
    const sessionToken = cookies.get("session-token");

    if (!sessionToken) {
      return {};
    }

    const { userID } = JWT.decode(sessionToken, Config.FLIVITY_KEY);

    return {
      session: {
        userID,
      },
    };
  } catch (err) {
    console.log("ERROR: ", err);

    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
