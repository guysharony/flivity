import { use, StackContext, Api as ApiGateway, Config } from "sst/constructs";
import * as iam from "aws-cdk-lib/aws-iam";

import { DatabaseStack } from "./DatabaseStack";

export function ApiStack({ stack, app }: StackContext) {
  const table = use(DatabaseStack);

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
          VITE_APP_URL: currentDomain,
          VITE_APP_API_URL: apiCustomDomain,
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
    VITE_APP_API_URL: api.url,
  });

  return api;
}
