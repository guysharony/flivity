import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";

import { t } from "@packages/libs/trpc/router";
import { createContext } from "@packages/libs/trpc/context";

import { userRouter } from "./types/user";
import { sessionRouter } from "./types/session";
import { videoRouter } from "./types/video";

export const appRouter = t.router({
  user: userRouter,
  session: sessionRouter,
  video: videoRouter,
});

export const trpc = appRouter.createCaller({});

export type AppRouter = typeof appRouter;

export const handler = async (event: any, context: any) => {
  const response = await awsLambdaRequestHandler({
    router: appRouter,
    createContext,
  })(event, context);

  return response;
};
