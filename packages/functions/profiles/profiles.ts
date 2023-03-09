import { ApiHandler } from "sst/node/api";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: "eu-west-1" });

async function streamToBuffer(stream: any) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export const handler = ApiHandler(async (event) => {
  const bucketName = process.env.BUCKET_PROFILE_NAME as string;

  const getObjectCommand = new GetObjectCommand({
    Bucket: bucketName,
    Key: "default/profile.jpg",
  });
  const s3Response = await s3.send(getObjectCommand);
  const imageBuffer = await streamToBuffer(s3Response.Body);

  return {
    statusCode: 200,
    isBase64Encoded: true,
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Length": imageBuffer.length.toString(),
    },
    body: imageBuffer.toString("base64"),
  };
});
