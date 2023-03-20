import { z, ZodError } from "zod";
import { match } from "oxide.ts";
import { TRPCError } from "@trpc/server";

import { t } from "@packages/libs/trpc/router";
import { ExceptionBase } from "@packages/libs/base/exceptions/exception.base";
import { FindVideoByIdService } from "@packages/core/video/queries/find-video-by-id/find-video-by-id.service";
import { FindVideoByIdQuery } from "@packages/core/video/queries/find-video-by-id/find-video-by-id.query";
import { VideoEntity } from "@packages/core/video/entity/video.entity";
import { VideoResponse } from "@packages/core/video/dtos/video-response.dto";
import { FindVideoByAuthorIDService } from "@packages/core/video/queries/find-video-by-authorID/find-video-by-authorID.service";
import { FindVideoByAuthorIDQuery } from "@packages/core/video/queries/find-video-by-authorID/find-video-by-authorID.query";
import { isAuthenticated } from "@packages/libs/trpc/procedure";

export const videoRouter = t.router({
  findById: t.procedure
    .input(z.object({ id: z.string() }))
    .query(async (req) => {
      const { id } = req.input;

      const service = new FindVideoByIdService();

      const query = new FindVideoByIdQuery({
        id: id,
      });

      const result = await service.handler(query);

      return match(result, {
        Ok: (user: VideoEntity) => new VideoResponse(user),
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
  findByAuthorID: t.procedure
    .input(z.object({ authorID: z.string() }))
    .query(async (req) => {
      const { authorID } = req.input;

      const service = new FindVideoByAuthorIDService();

      const query = new FindVideoByAuthorIDQuery({
        authorID: authorID,
      });

      const result = await service.handler(query);
      return result.unwrap().map((video) => new VideoResponse(video));
    }),
  createVideo: t.procedure
    .use(isAuthenticated)
    .input(
      z.object({
        filename: z.string(),
        filesize: z.number(),
        filetype: z.string(),
      })
    )
    .mutation(async (req) => {
      const { filename } = req.input;
      const { userID } = req.ctx.session;

      console.log(filename, userID);

      return {};
    }),
});
