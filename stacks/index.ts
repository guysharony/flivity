import { App } from "@serverless-stack/resources";

import { ApiStack } from "./ApiStack";
import { DatabaseStack } from "./DatabaseStack";
import { DnsStack } from "./DnsStack";
import { FrontendStack } from "./FrontendStack";

export default function main(app: App) {
  if (app.stage !== "prod") {
    app.setDefaultRemovalPolicy("destroy");
  }

  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });

  app
    .stack(DnsStack)
    .stack(DatabaseStack)
    .stack(ApiStack)
    .stack(FrontendStack);
}
