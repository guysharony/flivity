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

const createVideoBucket = (stack: Stack) => {
  const bucket = new Bucket(stack, "Bucket-Videos", {
    cors: [
      {
        allowedMethods: ["GET", "POST", "PUT"],
        allowedOrigins: ["*"],
        allowedHeaders: ["*"],
        exposedHeaders: ["ETag"],
      },
    ],
    cdk: {
      bucket: {
        removalPolicy: RemovalPolicy.DESTROY,
        versioned: true,
        encryption: BucketEncryption.S3_MANAGED,
        blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      },
    },
  });

  bucket.cdk.bucket.addToResourcePolicy(
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      principals: [new iam.AnyPrincipal()],
      actions: [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket",
        "s3:ListMultipartUploadParts",
        "s3:ListBucketMultipartUploads",
        "s3:AbortMultipartUpload",
      ],
      resources: [bucket.bucketArn, bucket.cdk.bucket.arnForObjects("*")],
      conditions: {
        StringEquals: {
          "s3:DataAccessPointAccount": `${stack.account}`,
        },
      },
    })
  );

  stack.addOutputs({
    BUCKET_VIDEOS: bucket.bucketName,
  });

  return bucket;
};

export function StorageStack({ stack }: StackContext) {
  const profiles = createProfileBucket(stack);
  const videos = createVideoBucket(stack);

  return {
    profiles,
    videos,
  };
}
