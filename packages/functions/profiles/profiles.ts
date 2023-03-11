import { ApiHandler } from "sst/node/api";
import {
  S3Client,
  GetObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: "eu-west-1" });

const streamToBuffer = async (stream: any) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
};

const streamResponse = (imageBuffer: Buffer = Buffer.concat([])) => {
  return {
    statusCode: !imageBuffer.length ? 404 : 200,
    isBase64Encoded: true,
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Length": imageBuffer.length.toString(),
    },
    body: imageBuffer.toString("base64"),
  };
};

const checkImageExists = async (key: string) => {
  try {
    const bucketName = process.env.BUCKET_PROFILE_NAME as string;

    const headObjectCommand = new HeadObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    await s3.send(headObjectCommand);

    return true;
  } catch (error) {
    return false;
  }
};

const getImage = async (key: string) => {
  const bucketName = process.env.BUCKET_PROFILE_NAME as string;

  const getObjectCommand = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });
  const s3Response = await s3.send(getObjectCommand);

  return await streamToBuffer(s3Response.Body);
};

export const handler = ApiHandler(async (event) => {
  console.log("test");

  const params = event.pathParameters;
  const query = new URLSearchParams(event.rawQueryString);
  const id = params.userID;
  const picture = query.get("picture");

  if (!id) {
    return streamResponse();
  }

  const imageBuffer = await getImage(
    picture ? `picture/${params.userID}/${picture}.jpg` : "default/profile.jpg"
  );

  return streamResponse(imageBuffer);
});
