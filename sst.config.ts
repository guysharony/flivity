import { SSTConfig } from "sst";
import { ApiStack } from "./stacks/ApiStack";
import { AuthStack } from "./stacks/AuthStack";
import { DatabaseStack } from "./stacks/DatabaseStack";
import { DnsStack } from "./stacks/DnsStack";
import { ApplicationStack } from "./stacks/ApplicationStack";
import { HomeStack } from "./stacks/HomeStack";

export default {
  config(_input) {
    return {
      name: "flivity",
      region: "eu-west-1",
    };
  },
  stacks(app) {
    if (app.stage !== "prod") {
      app.setDefaultRemovalPolicy("destroy");
    }

    app.setDefaultFunctionProps({
      runtime: "nodejs16.x",
      architecture: "arm_64",
    });

    app
      .stack(DnsStack)
      .stack(DatabaseStack)
      .stack(ApiStack)
      .stack(AuthStack)
      .stack(ApplicationStack)
      .stack(HomeStack);
  },
} satisfies SSTConfig;
