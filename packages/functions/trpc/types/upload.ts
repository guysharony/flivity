import { z } from "zod";
import { t } from "@packages/libs/trpc/router";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import {
  CreateMultipartUploadCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3,
  S3Client,
} from "@aws-sdk/client-s3";

const videoBucket = process.env.BUCKET_VIDEO_NAME as string;

const s3 = new S3Client({ region: "eu-west-1" });

export const uploadRouter = t.router({
  initialize: t.procedure
    .input(z.object({ name: z.string() }))
    .mutation(async (req) => {
      const { name } = req.input;

      const multipartUploadCommand = new CreateMultipartUploadCommand({
        Bucket: videoBucket,
        Key: name,
      });

      const response = await s3.send(multipartUploadCommand);

      return {
        key: response.Key,
        id: response.UploadId,
      };
    }),
  presigned: t.procedure
    .input(z.object({ key: z.string(), file: z.string(), parts: z.number() }))
    .mutation(async (req) => {
      const { key, file, parts } = req.input;

      await createPresignedPost(s3);

      return {};
    }),
});
