import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";

import { t } from "@services/libs/trpc/router";
import { createContext } from "@services/libs/trpc/context";

import { userRouter } from "./types/user";
import { sessionRouter } from "./types/session";

export const appRouter = t.router({
  user: userRouter,
  session: sessionRouter,
});

export const trpc = appRouter.createCaller({});

export type AppRouter = typeof appRouter;

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
});
