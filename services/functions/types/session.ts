import { z, ZodError } from "zod";
import { match } from "oxide.ts";
import { TRPCError } from "@trpc/server";

import { t } from "@services/libs/trpc/router";
import { IDResponse } from "@services/libs/responses/id/id.response";
import { ExceptionBase } from "@services/libs/base/exceptions/exception.base";
import { CreateSessionCommand } from "@services/core/session/commands/create-session/create-session.command";
import { CreateSessionService } from "@services/core/session/commands/create-session/create-session.service";
import { FindSessionService } from "@services/core/session/queries/find-session/find-session.service";
import { FindSessionQuery } from "@services/core/session/queries/find-session/find-session.query";
import { SessionResponse } from "@services/core/session/dtos/session-response.dto";
import { FindSessionByIdService } from "@services/core/session/queries/find-session-by-id/find-session-by-id.service";
import { FindSessionByIdQuery } from "@services/core/session/queries/find-session-by-id/find-session-by-id.query";
import { DeleteSessionCommand } from "@services/core/session/commands/delete-token/delete-session.command";
import { DeleteSessionService } from "@services/core/session/commands/delete-token/create-session.service";
import { SessionEntity } from "@services/core/session/entity/session.entity";

export const sessionRouter = t.router({
  findById: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async (req) => {
      const { id } = req.input;

      const service = new FindSessionByIdService();

      const query = new FindSessionByIdQuery({
        id: id,
      });

      const result = await service.handler(query);

      return match(result, {
        Ok: (session: SessionEntity) => new SessionResponse(session),
        Err: (error: Error) => {
          if (error instanceof ExceptionBase) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: error.message,
            });
          }

          throw error;
        },
      });
    }),
  findByToken: t.procedure
    .input(z.object({ email: z.string(), token: z.string() }))
    .query(async (req) => {
      const { email, token } = req.input;

      const service = new FindSessionService();

      const query = new FindSessionQuery({
        email: email,
        token: token,
      });

      const result = await service.handler(query);

      return match(result, {
        Ok: (session: SessionEntity) => new SessionResponse(session),
        Err: (error: Error) => {
          if (error instanceof ExceptionBase) {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: error.message,
            });
          }

          throw error;
        },
      });
    }),
  create: t.procedure
    .input(
      z.object({
        userId: z.string(),
        email: z.string(),
        token: z.string(),
      })
    )
    .mutation(async (req) => {
      const { userId, email, token } = req.input;

      const command = new CreateSessionCommand({
        userId: userId,
        email: email,
        token: token,
      });

      const service = new CreateSessionService();
      const result = await service.handler(command);

      return match(result, {
        Ok: (id: string) => new IDResponse(id),
        Err: (error: Error) => {
          if (error instanceof ExceptionBase) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: error.message,
            });
          }
          throw error;
        },
      });
    }),
  delete: t.procedure
    .input(
      z.object({
        email: z.string(),
        token: z.string(),
      })
    )
    .mutation(async (req) => {
      const { email, token } = req.input;

      const command = new DeleteSessionCommand({
        email: email,
        token: token,
      });

      const service = new DeleteSessionService();
      const result = await service.handler(command);

      return match(result, {
        Ok: (id: string) => new IDResponse(id),
        Err: (error: Error) => {
          if (error instanceof ExceptionBase) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: error.message,
            });
          }
          throw error;
        },
      });
    }),
});
