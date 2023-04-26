import { use, StaticSite, StackContext } from "sst/constructs";

import { ApiStack } from "./ApiStack";
import { DnsStack } from "./DnsStack";

export function HomeStack({ stack, app }: StackContext) {
  const dns = use(DnsStack);

  const apiDomain =
    app.stage === "prod"
      ? "https://api.flivity.com"
      : `https://api.${app.stage}.flivity.com`;
  const homeDomain =
    app.stage === "prod" ? "https://flivity.com" : "http://localhost:3000";

  const applicationDomain =
    app.stage === "prod" ? "https://app.flivity.com" : "http://localhost:3001";

  const site = new StaticSite(stack, "home", {
    path: "web/home",
    environment: {
      VITE_API_URL: apiDomain,
      VITE_HOME_URL: homeDomain,
      VITE_APPLICATION_URL: applicationDomain,
    },
    buildOutput: "build",
    buildCommand: "npm run build",
    customDomain: {
      domainName:
        app.stage === "prod" ? `flivity.com` : `${app.stage}.flivity.com`,
      cdk: {
        hostedZone: dns.hostedZone,
        certificate: dns.certificateGlobal,
      },
    },
  });

  stack.addOutputs({
    HOME: homeDomain,
  });

  return site;
}
