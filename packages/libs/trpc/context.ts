import { APIGatewayProxyEventV2 } from "aws-lambda";

import * as trpc from "@trpc/server";
import { CreateAWSLambdaContextOptions } from "@trpc/server/adapters/aws-lambda";

export const createContext = ({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => {
  return {};
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
