import { TRPCError } from "@trpc/server";
import { t } from "./router";

export const isAuthenticated = t.middleware(({ next, ctx }) => {
  if (!ctx.session?.userID) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});
