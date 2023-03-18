import { z } from "zod";
import { t } from "@packages/libs/trpc/router";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import {
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  GetObjectCommand,
  S3,
  S3Client,
} from "@aws-sdk/client-s3";

const videoBucket = process.env.BUCKET_VIDEO_NAME as string;

const s3 = new S3Client({ region: "eu-west-1" });

export const uploadRouter = t.router({
  initialize: t.procedure
    .input(z.object({ filename: z.string() }))
    .mutation(async (req) => {
      const { filename } = req.input;

      const multipartUploadCommand = new CreateMultipartUploadCommand({
        Bucket: videoBucket,
        Key: filename,
      });

      const response = await s3.send(multipartUploadCommand);

      return {
        key: response.Key!,
        id: response.UploadId!,
      };
    }),
  presigned: t.procedure
    .input(
      z.object({
        filename: z.string(),
        filetype: z.string(),
        part: z.number(),
        id: z.string(),
        filesize: z.number(),
        partsize: z.number(),
      })
    )
    .mutation(async (req) => {
      const { filename, filetype, part, filesize, partsize, id } = req.input;

      const presignedPostResponse = await createPresignedPost(s3, {
        Bucket: videoBucket,
        Key: filename,
        Fields: {
          key: filename,
          "Content-Type": filetype,
          "x-amz-meta-part-number": part.toString(),
          "x-amz-meta-upload-id": id,
          "x-amz-meta-max-parts": Math.ceil(filesize / partsize).toString(),
        },
        Conditions: [["content-length-range", 0, 1000000]],
        Expires: 3600,
      });

      return presignedPostResponse;
    }),
  complete: t.procedure
    .input(
      z.object({
        id: z.string(),
        filename: z.string(),
        parts: z.array(z.object({ ETag: z.string(), PartNumber: z.number() })),
      })
    )
    .mutation(async (req) => {
      const { id, filename, parts } = req.input;

      const multipartUploadCommand = new CompleteMultipartUploadCommand({
        Bucket: videoBucket,
        Key: filename,
        UploadId: id,
        MultipartUpload: {
          Parts: parts,
        },
      });

      const response = await s3.send(multipartUploadCommand);

      return response;
    }),
});
