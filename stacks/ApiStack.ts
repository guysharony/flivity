import {
  use,
  StackContext,
  Api as ApiGateway,
  Auth,
  Config,
} from "sst/constructs";
import * as iam from "aws-cdk-lib/aws-iam";

import { DatabaseStack } from "./DatabaseStack";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }: StackContext) {
  const table = use(DatabaseStack);
  const storage = use(StorageStack);

  const FLIVITY_KEY = new Config.Secret(stack, "FLIVITY_KEY");

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
          new iam.PolicyStatement({
            actions: ["s3:GetObject"],
            effect: iam.Effect.ALLOW,
            resources: [`arn:aws:s3:::${storage.profiles.bucketName}/*`],
          }),
        ],
      },
    },
    routes: {
      "GET /profiles/{userID}": {
        function: {
          handler: "packages/functions/profiles/profiles.handler",
        },
      },
      "GET /session": {
        function: {
          handler: "packages/functions/session/session.handler",
        },
      },
      "GET /trpc/{proxy+}": {
        function: {
          handler: "packages/functions/trpc/trpc.handler",
        },
      },
      "POST /trpc/{proxy+}": {
        function: {
          handler: "packages/functions/trpc/trpc.handler",
        },
      },
    },
  });

  api.bind([FLIVITY_KEY]);

  stack.addOutputs({
    REACT_APP_API_URL: api.url,
  });

  return api;
}
