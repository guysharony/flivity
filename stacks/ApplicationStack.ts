import { use, StaticSite, StackContext } from "sst/constructs";

import { ApiStack } from "./ApiStack";
import { DnsStack } from "./DnsStack";

export function ApplicationStack({ stack, app }: StackContext) {
  const api = use(ApiStack);
  const dns = use(DnsStack);

  const currentDomain =
    app.stage === "prod" ? "https://app.flivity.com" : "http://localhost:3001";

  const site = new StaticSite(stack, "application", {
    path: "web/application",
    environment: {
      VITE_APP_API_URL: api.customDomainUrl || api.url,
      VITE_APP_URL: currentDomain,
    },
    buildOutput: "build",
    buildCommand: "npm run build",
    customDomain: {
      domainName:
        app.stage === "prod"
          ? `app.flivity.com`
          : `app.${app.stage}.flivity.com`,
      cdk: {
        hostedZone: dns.hostedZone,
        certificate: dns.certificateGlobal,
      },
    },
  });

  stack.addOutputs({
    APPLICATION: currentDomain,
  });

  return site;
}
