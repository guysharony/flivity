import { initTRPC } from "@trpc/server";
import { ZodError } from "zod";

import { Context } from "./context";

export const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        httpStatus: shape.data.httpStatus,
        code: shape.data.code,
        cause:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});
