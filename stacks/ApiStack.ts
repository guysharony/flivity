import { use, StackContext, Api as ApiGateway, Auth } from "sst/constructs";
import * as iam from "aws-cdk-lib/aws-iam";

import { DatabaseStack } from "./DatabaseStack";

export function ApiStack({ stack, app }: StackContext) {
  const table = use(DatabaseStack);

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
        },
        permissions: ["ses"],
      },
    },
    routes: {
      "GET /session": {
        function: {
          handler: "functions/session.handler",
        },
      },
      "GET /trpc/{proxy+}": {
        function: {
          handler: "functions/trpc.handler",
        },
      },
      "POST /trpc/{proxy+}": {
        function: {
          handler: "functions/trpc.handler",
        },
      },
    },
  });

  stack.addOutputs({
    REACT_APP_API_URL: api.url,
  });

  const auth = new Auth(stack, "auth", {
    authenticator: {
      handler: "functions/auth.handler",
    },
  });

  auth.attach(stack, {
    api,
    prefix: "/auth",
  });

  return api;
}
