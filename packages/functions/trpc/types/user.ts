import { z, ZodError } from "zod";
import { match } from "oxide.ts";
import { TRPCError } from "@trpc/server";

import { t } from "@packages/libs/trpc/router";
import {
  isAuthenticated,
  isNotAuthenticated,
} from "@packages/libs/trpc/procedure";
import { IDResponse } from "@packages/libs/responses/id/id.response";
import { BooleanResponse } from "@packages/libs/responses/boolean/boolean.response";
import { UserResponse } from "@packages/core/user/dtos/user-response.dto";
import { ExceptionBase } from "@packages/libs/base/exceptions/exception.base";
import { CreateUserCommand } from "@packages/core/user/commands/create-user/create-user.command";
import { CreateUserService } from "@packages/core/user/commands/create-user/create-user.service";
import { FindUserByIdQuery } from "@packages/core/user/queries/find-user-by-id/find-user-by-id.query";
import { FindUserByIdService } from "@packages/core/user/queries/find-user-by-id/find-user-by-id.service";
import { FindUserByEmailService } from "@packages/core/user/queries/find-user-by-email/find-user-by-email.service";
import { FindUserByEmailQuery } from "@packages/core/user/queries/find-user-by-email/find-user-by-email.query";
import { UpdateUserEmailVerifiedCommand } from "@packages/core/user/commands/update-user-emailVerified/update-user-emailVerified.command";
import { UpdateUserEmailVerifiedService } from "@packages/core/user/commands/update-user-emailVerified/update-user-emailVerified.service";
import { SetupUserCommand } from "@packages/core/user/commands/setup-user/setup-user.command";
import { SetupUserService } from "@packages/core/user/commands/setup-user/setup-user.service";
import { UserEntity } from "@packages/core/user/entity/user.entity";

export const userRouter = t.router({
  findById: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async (req) => {
      const { id } = req.input;

      const service = new FindUserByIdService();

      const query = new FindUserByIdQuery({
        id: id,
      });

      const result = await service.handler(query);

      return match(result, {
        Ok: (user: UserEntity) => new UserResponse(user),
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
  findByEmail: t.procedure
    .input(z.object({ email: z.string() }))
    .query(async (req) => {
      const { email } = req.input;

      const service = new FindUserByEmailService();

      const query = new FindUserByEmailQuery({
        email: email,
      });

      const result = await service.handler(query);

      return match(result, {
        Ok: (user: UserEntity) => new UserResponse(user),
        Err: (error: Error) => {
          if (error instanceof ExceptionBase) {
            return null;
          }

          throw error;
        },
      });
    }),
  updateEmailVerified: t.procedure
    .input(
      z.object({
        id: z.string(),
        hasEmailVerified: z.boolean(),
      })
    )
    .mutation(async (req) => {
      const { id, hasEmailVerified } = req.input;

      const command = new UpdateUserEmailVerifiedCommand({
        id: id,
        hasEmailVerified: hasEmailVerified,
      });

      const service = new UpdateUserEmailVerifiedService();
      const result = await service.handler(command);

      return match(result, {
        Ok: (status: boolean) => new BooleanResponse(status),
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
  create: t.procedure
    .use(isNotAuthenticated)
    .input(
      z.object({
        email: z.string().email({ message: "Email address is not valid." }),
      })
    )
    .mutation(async (req) => {
      const { email } = req.input;

      const command = new CreateUserCommand({
        email: email,
      });

      const service = new CreateUserService();
      const result = await service.handler(command);

      return match(result, {
        Ok: (id: string) => new IDResponse(id),
        Err: (error: Error) => {
          if (error instanceof ExceptionBase) {
            let cause = undefined;

            if (error.code == "USER.EMAIL_ALREADY_TAKEN") {
              cause = new ZodError([
                {
                  validation: "email",
                  code: "invalid_string",
                  message: error.message,
                  path: ["email"],
                },
              ]);
            }

            throw new TRPCError({
              code: "BAD_REQUEST",
              message: cause?.message || error.message,
              cause: cause,
            });
          }
          throw error;
        },
      });
    }),
  setup: t.procedure
    .use(isAuthenticated)
    .input(
      z.object({
        id: z.string(),
        firstName: z
          .string()
          .min(1, { message: "Must be at least 1 characters long." })
          .max(20, { message: "Must be less than 20 characters long." }),
        lastName: z
          .string()
          .min(1, { message: "Must be at least 1 characters long." })
          .max(20, { message: "Must be less than 20 characters long." }),
      })
    )
    .mutation(async (req) => {
      const { id, firstName, lastName } = req.input;

      const command = new SetupUserCommand({
        id: id,
        firstName: firstName,
        lastName: lastName,
      });

      const service = new SetupUserService();
      const result = await service.handler(command);

      return match(result, {
        Ok: (result: UserEntity) => new UserResponse(result),
        Err: (error: Error) => {
          if (error instanceof ExceptionBase) {
            let cause = undefined;

            if (error.code == "USER.USERNAME_ALREADY_TAKEN") {
              cause = new ZodError([
                {
                  code: "custom",
                  message: error.message,
                  path: ["username"],
                },
              ]);
            }

            throw new TRPCError({
              code: "BAD_REQUEST",
              message: cause?.message || error.message,
              cause: cause,
            });
          }
          throw error;
        },
      });
    }),
});
