import { use, StaticSite, StackContext } from "sst/constructs";

import { ApiStack } from "./ApiStack";
import { DnsStack } from "./DnsStack";

export function HomeStack({ stack, app }: StackContext) {
  const api = use(ApiStack);
  const dns = use(DnsStack);

  const currentDomain =
    app.stage === "prod" ? "https://flivity.com" : "http://localhost:3000";

  const site = new StaticSite(stack, "home", {
    path: "web/home",
    environment: {
      VITE_APP_API_URL: api.customDomainUrl || api.url,
      VITE_APP_URL: currentDomain,
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
    HOME: currentDomain,
  });

  return site;
}
