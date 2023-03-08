import { Bucket, Stack, StackContext } from "sst/constructs";

import { RemovalPolicy } from "aws-cdk-lib";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { fileURLToPath } from "url";
import * as path from "path";
import * as fs from "fs";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createBucket = (stack: Stack, id: string) => {
  const bucket = new Bucket(stack, `Bucket-${id}`, {
    cdk: {
      bucket: {
        publicReadAccess: false,
        autoDeleteObjects: true,
        removalPolicy: RemovalPolicy.DESTROY,
      },
    },
  });

  const root = path.join(__dirname, "storage", id);
  if (fs.existsSync(root)) {
    new BucketDeployment(stack, `Bucket-Deployment-${id}`, {
      sources: [Source.asset(root)],
      destinationBucket: bucket.cdk.bucket,
      destinationKeyPrefix: "/",
    });
  }

  return bucket;
};

export function StorageStack({ stack }: StackContext) {
  const bucket = createBucket(stack, "profiles");

  return bucket;
}
