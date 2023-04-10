import { Bucket, Stack, StackContext } from "sst/constructs";
import { RemovalPolicy } from "aws-cdk-lib";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { fileURLToPath } from "url";
import * as path from "path";
import * as fs from "fs";
import { dirname } from "path";
import * as iam from "aws-cdk-lib/aws-iam";
import {
  BlockPublicAccess,
  BucketEncryption,
  BucketPolicy,
} from "aws-cdk-lib/aws-s3";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { S3EventSource } from "aws-cdk-lib/aws-lambda-event-sources";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createProfileBucket = (stack: Stack) => {
  const bucket = new Bucket(stack, "Bucket-Profiles", {
    cdk: {
      bucket: {
        publicReadAccess: false,
        autoDeleteObjects: true,
        removalPolicy: RemovalPolicy.DESTROY,
      },
    },
  });

  const root = path.join(__dirname, "storage", "profiles");
  if (fs.existsSync(root)) {
    new BucketDeployment(stack, `Bucket-Deployment-Profile`, {
      sources: [Source.asset(root)],
      destinationBucket: bucket.cdk.bucket,
      destinationKeyPrefix: "/",
    });
  }

  stack.addOutputs({
    BUCKET_PROFILES: bucket.bucketName,
  });

  return bucket;
};

export function StorageStack({ stack }: StackContext) {
  const profiles = createProfileBucket(stack);

  return {
    profiles,
  };
}
