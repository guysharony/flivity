import { z } from "zod";
import { t } from "@packages/libs/trpc/router";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3,
  S3Client,
  UploadPartCommand,
  UploadPartCopyCommand,
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
        Key: `video/${filename}`,
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
        part: z.number(),
        id: z.string(),
        filename: z.string(),
      })
    )
    .mutation(async (req) => {
      const { id, part, filename } = req.input;

      /*
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
        Conditions: [
          ["content-length-range", 0, partsize],
          { "x-amz-meta-part-number": part.toString() },
          { "x-amz-meta-upload-id": id },
        ],
        Expires: 3600,
      });

      return presignedPostResponse;
			*/
      const uploadPart = new UploadPartCommand({
        Bucket: videoBucket,
        Key: `video/${filename}`,
        UploadId: id,
        PartNumber: part,
      });

      const response = await getSignedUrl(s3, uploadPart, {
        expiresIn: 3600,
      });

      return { url: response };
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
        Key: `video/${filename}`,
        UploadId: id,
        MultipartUpload: {
          Parts: parts,
        },
      });

      const response = await s3.send(multipartUploadCommand);

      return response;
    }),
});
