import { use, StaticSite, StackContext } from "sst/constructs";

import { ApiStack } from "./ApiStack";
import { DnsStack } from "./DnsStack";

export function FrontendStack({ stack, app }: StackContext) {
  const api = use(ApiStack);
  const dns = use(DnsStack);

  const site = new StaticSite(stack, "frontend", {
    path: "web",
    environment: {
      REACT_APP_API_URL: api.customDomainUrl || api.url,
      REACT_APP_URL: api.customDomainUrl!,
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

  // Show the url in the output
  stack.addOutputs({
    SITE: site.url || "",
  });

  return site;
}
