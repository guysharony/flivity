import { use, StackContext, Api as ApiGateway, Auth } from "sst/constructs";
import * as iam from "aws-cdk-lib/aws-iam";

import { DatabaseStack } from "./DatabaseStack";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }: StackContext) {
  const table = use(DatabaseStack);
  const storage = use(StorageStack);

  const apiCustomDomain =
    app.stage === "prod" ? "api.flivity.com" : `api.${app.stage}.flivity.com`;

  const currentDomain =
    app.stage === "prod" ? "https://flivity.com" : "http://localhost:3000";

  const api = new ApiGateway(stack, "api", {
    customDomain: apiCustomDomain,
    cors: {
      allowCredentials: true,
      allowHeaders: ["content-type", "authorization"],
      allowMethods: ["ANY"],
      allowOrigins: [currentDomain],
    },
    defaults: {
      function: {
        architecture: "arm_64",
        bind: [table],
        environment: {
          REACT_APP_URL: currentDomain,
          REACT_APP_API_URL: apiCustomDomain,
          BUCKET_PROFILE_NAME: storage.profiles.bucketName,
        },
        permissions: [
          new iam.PolicyStatement({
            actions: ["ses:SendEmail"],
            effect: iam.Effect.ALLOW,
            resources: [
              `arn:aws:ses:${stack.region}:${stack.account}:identity/*`,
            ],
          }),
        ],
      },
    },
    routes: {
      "GET /session": {
        function: {
          handler: "packages/functions/session.handler",
        },
      },
      "GET /trpc/{proxy+}": {
        function: {
          handler: "packages/functions/trpc.handler",
        },
      },
      "POST /trpc/{proxy+}": {
        function: {
          handler: "packages/functions/trpc.handler",
        },
      },
    },
  });

  stack.addOutputs({
    REACT_APP_API_URL: api.url,
  });

  return api;
}
