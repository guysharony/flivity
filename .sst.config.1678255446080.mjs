import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// stacks/ApiStack.ts
import { use, Api as ApiGateway, Auth } from "sst/constructs";
import * as iam from "aws-cdk-lib/aws-iam";

// stacks/DatabaseStack.ts
import { Table } from "sst/constructs";
function DatabaseStack({ stack }) {
  const table = new Table(stack, "table", {
    fields: {
      pk: "string",
      sk: "string",
      gsi1pk: "string",
      gsi1sk: "string",
      gsi2pk: "string",
      gsi2sk: "string",
      gsi3pk: "string",
      gsi3sk: "string",
      gsi4pk: "string",
      gsi4sk: "string",
      gsi5pk: "string",
      gsi5sk: "string"
    },
    primaryIndex: {
      partitionKey: "pk",
      sortKey: "sk"
    },
    globalIndexes: {
      gsi1: {
        partitionKey: "gsi1pk",
        sortKey: "gsi1sk"
      },
      gsi2: {
        partitionKey: "gsi2pk",
        sortKey: "gsi2sk"
      },
      gsi3: {
        partitionKey: "gsi3pk",
        sortKey: "gsi3sk"
      },
      gsi4: {
        partitionKey: "gsi4pk",
        sortKey: "gsi4sk"
      },
      gsi5: {
        partitionKey: "gsi5pk",
        sortKey: "gsi5sk"
      }
    }
  });
  return table;
}
__name(DatabaseStack, "DatabaseStack");

// stacks/ApiStack.ts
function ApiStack({ stack, app }) {
  const table = use(DatabaseStack);
  const apiCustomDomain = app.stage === "prod" ? "api.flivity.com" : `api.${app.stage}.flivity.com`;
  const currentDomain = app.stage === "prod" ? "https://flivity.com" : "http://localhost:3000";
  const api = new ApiGateway(stack, "api", {
    customDomain: apiCustomDomain,
    cors: {
      allowCredentials: true,
      allowHeaders: ["content-type", "authorization"],
      allowMethods: ["ANY"],
      allowOrigins: [currentDomain]
    },
    defaults: {
      function: {
        architecture: "arm_64",
        bind: [table],
        environment: {
          REACT_APP_URL: currentDomain,
          REACT_APP_API_URL: apiCustomDomain
        },
        permissions: [
          new iam.PolicyStatement({
            actions: ["ses:SendEmail"],
            effect: iam.Effect.ALLOW,
            resources: [
              `arn:aws:ses:${stack.region}:${stack.account}:identity/*`
            ]
          })
        ]
      }
    },
    routes: {
      "GET /session": {
        function: {
          handler: "packages/functions/session.handler"
        }
      },
      "GET /trpc/{proxy+}": {
        function: {
          handler: "packages/functions/trpc.handler"
        }
      },
      "POST /trpc/{proxy+}": {
        function: {
          handler: "packages/functions/trpc.handler"
        }
      }
    }
  });
  stack.addOutputs({
    REACT_APP_API_URL: api.url
  });
  const auth = new Auth(stack, "auth", {
    authenticator: {
      handler: "packages/functions/auth.handler"
    }
  });
  auth.attach(stack, {
    api,
    prefix: "/auth"
  });
  return api;
}
__name(ApiStack, "ApiStack");

// stacks/DnsStack.ts
import {
  DnsValidatedCertificate
} from "aws-cdk-lib/aws-certificatemanager";
import { HostedZone } from "aws-cdk-lib/aws-route53";
function DnsStack({ stack, app }) {
  const hostedZoneName = app.stage === "prod" ? `flivity.com` : `${app.stage}.flivity.com`;
  const hostedZone = hostedZoneName ? HostedZone.fromLookup(stack, "Zone", {
    domainName: hostedZoneName
  }) : void 0;
  let certificateRegional, certificateGlobal;
  if (hostedZoneName && hostedZone) {
    certificateRegional = new DnsValidatedCertificate(
      stack,
      "RegionalCertificate",
      {
        domainName: hostedZoneName,
        hostedZone,
        subjectAlternativeNames: [`*.${hostedZoneName}`]
      }
    );
    certificateGlobal = app.region === "us-east-1" ? certificateRegional : new DnsValidatedCertificate(stack, "GlobalCertificate", {
      domainName: hostedZoneName,
      hostedZone,
      subjectAlternativeNames: [`*.${hostedZoneName}`],
      region: "us-east-1"
    });
  }
  return {
    certificateRegional,
    certificateGlobal,
    hostedZone,
    domainName: hostedZoneName
  };
}
__name(DnsStack, "DnsStack");

// stacks/FrontendStack.ts
import { use as use2, StaticSite } from "sst/constructs";
function FrontendStack({ stack, app }) {
  const api = use2(ApiStack);
  const dns = use2(DnsStack);
  const site = new StaticSite(stack, "frontend", {
    path: "web",
    environment: {
      REACT_APP_API_URL: api.customDomainUrl || api.url,
      REACT_APP_URL: api.customDomainUrl
    },
    buildOutput: "build",
    buildCommand: "npm run build",
    customDomain: {
      domainName: app.stage === "prod" ? `flivity.com` : `${app.stage}.flivity.com`,
      cdk: {
        hostedZone: dns.hostedZone,
        certificate: dns.certificateGlobal
      }
    }
  });
  stack.addOutputs({
    SITE: site.url || ""
  });
  return site;
}
__name(FrontendStack, "FrontendStack");

// sst.config.ts
var sst_config_default = {
  config(_input) {
    return {
      name: "flivity",
      region: "eu-west-1"
    };
  },
  stacks(app) {
    if (app.stage !== "prod") {
      app.setDefaultRemovalPolicy("destroy");
    }
    app.setDefaultFunctionProps({
      runtime: "nodejs16.x",
      architecture: "arm_64"
    });
    app.stack(DnsStack).stack(DatabaseStack).stack(ApiStack).stack(FrontendStack);
  }
};
export {
  sst_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RhY2tzL0FwaVN0YWNrLnRzIiwgInN0YWNrcy9EYXRhYmFzZVN0YWNrLnRzIiwgInN0YWNrcy9EbnNTdGFjay50cyIsICJzdGFja3MvRnJvbnRlbmRTdGFjay50cyIsICJzc3QuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyB1c2UsIFN0YWNrQ29udGV4dCwgQXBpIGFzIEFwaUdhdGV3YXksIEF1dGggfSBmcm9tIFwic3N0L2NvbnN0cnVjdHNcIjtcbmltcG9ydCAqIGFzIGlhbSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWlhbVwiO1xuXG5pbXBvcnQgeyBEYXRhYmFzZVN0YWNrIH0gZnJvbSBcIi4vRGF0YWJhc2VTdGFja1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gQXBpU3RhY2soeyBzdGFjaywgYXBwIH06IFN0YWNrQ29udGV4dCkge1xuICBjb25zdCB0YWJsZSA9IHVzZShEYXRhYmFzZVN0YWNrKTtcblxuICBjb25zdCBhcGlDdXN0b21Eb21haW4gPVxuICAgIGFwcC5zdGFnZSA9PT0gXCJwcm9kXCIgPyBcImFwaS5mbGl2aXR5LmNvbVwiIDogYGFwaS4ke2FwcC5zdGFnZX0uZmxpdml0eS5jb21gO1xuXG4gIGNvbnN0IGN1cnJlbnREb21haW4gPVxuICAgIGFwcC5zdGFnZSA9PT0gXCJwcm9kXCIgPyBcImh0dHBzOi8vZmxpdml0eS5jb21cIiA6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCI7XG5cbiAgY29uc3QgYXBpID0gbmV3IEFwaUdhdGV3YXkoc3RhY2ssIFwiYXBpXCIsIHtcbiAgICBjdXN0b21Eb21haW46IGFwaUN1c3RvbURvbWFpbixcbiAgICBjb3JzOiB7XG4gICAgICBhbGxvd0NyZWRlbnRpYWxzOiB0cnVlLFxuICAgICAgYWxsb3dIZWFkZXJzOiBbXCJjb250ZW50LXR5cGVcIiwgXCJhdXRob3JpemF0aW9uXCJdLFxuICAgICAgYWxsb3dNZXRob2RzOiBbXCJBTllcIl0sXG4gICAgICBhbGxvd09yaWdpbnM6IFtjdXJyZW50RG9tYWluXSxcbiAgICB9LFxuICAgIGRlZmF1bHRzOiB7XG4gICAgICBmdW5jdGlvbjoge1xuICAgICAgICBhcmNoaXRlY3R1cmU6IFwiYXJtXzY0XCIsXG4gICAgICAgIGJpbmQ6IFt0YWJsZV0sXG4gICAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgICAgUkVBQ1RfQVBQX1VSTDogY3VycmVudERvbWFpbixcbiAgICAgICAgICBSRUFDVF9BUFBfQVBJX1VSTDogYXBpQ3VzdG9tRG9tYWluLFxuICAgICAgICB9LFxuICAgICAgICBwZXJtaXNzaW9uczogW1xuICAgICAgICAgIG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgICAgICAgIGFjdGlvbnM6IFtcInNlczpTZW5kRW1haWxcIl0sXG4gICAgICAgICAgICBlZmZlY3Q6IGlhbS5FZmZlY3QuQUxMT1csXG4gICAgICAgICAgICByZXNvdXJjZXM6IFtcbiAgICAgICAgICAgICAgYGFybjphd3M6c2VzOiR7c3RhY2sucmVnaW9ufToke3N0YWNrLmFjY291bnR9OmlkZW50aXR5LypgLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICByb3V0ZXM6IHtcbiAgICAgIFwiR0VUIC9zZXNzaW9uXCI6IHtcbiAgICAgICAgZnVuY3Rpb246IHtcbiAgICAgICAgICBoYW5kbGVyOiBcInBhY2thZ2VzL2Z1bmN0aW9ucy9zZXNzaW9uLmhhbmRsZXJcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBcIkdFVCAvdHJwYy97cHJveHkrfVwiOiB7XG4gICAgICAgIGZ1bmN0aW9uOiB7XG4gICAgICAgICAgaGFuZGxlcjogXCJwYWNrYWdlcy9mdW5jdGlvbnMvdHJwYy5oYW5kbGVyXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgXCJQT1NUIC90cnBjL3twcm94eSt9XCI6IHtcbiAgICAgICAgZnVuY3Rpb246IHtcbiAgICAgICAgICBoYW5kbGVyOiBcInBhY2thZ2VzL2Z1bmN0aW9ucy90cnBjLmhhbmRsZXJcIixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSk7XG5cbiAgc3RhY2suYWRkT3V0cHV0cyh7XG4gICAgUkVBQ1RfQVBQX0FQSV9VUkw6IGFwaS51cmwsXG4gIH0pO1xuXG4gIGNvbnN0IGF1dGggPSBuZXcgQXV0aChzdGFjaywgXCJhdXRoXCIsIHtcbiAgICBhdXRoZW50aWNhdG9yOiB7XG4gICAgICBoYW5kbGVyOiBcInBhY2thZ2VzL2Z1bmN0aW9ucy9hdXRoLmhhbmRsZXJcIixcbiAgICB9LFxuICB9KTtcblxuICBhdXRoLmF0dGFjaChzdGFjaywge1xuICAgIGFwaSxcbiAgICBwcmVmaXg6IFwiL2F1dGhcIixcbiAgfSk7XG5cbiAgcmV0dXJuIGFwaTtcbn1cbiIsICJpbXBvcnQgeyBTdGFja0NvbnRleHQsIFRhYmxlIH0gZnJvbSBcInNzdC9jb25zdHJ1Y3RzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBEYXRhYmFzZVN0YWNrKHsgc3RhY2sgfTogU3RhY2tDb250ZXh0KSB7XG4gIGNvbnN0IHRhYmxlID0gbmV3IFRhYmxlKHN0YWNrLCBcInRhYmxlXCIsIHtcbiAgICBmaWVsZHM6IHtcbiAgICAgIHBrOiBcInN0cmluZ1wiLFxuICAgICAgc2s6IFwic3RyaW5nXCIsXG4gICAgICBnc2kxcGs6IFwic3RyaW5nXCIsXG4gICAgICBnc2kxc2s6IFwic3RyaW5nXCIsXG4gICAgICBnc2kycGs6IFwic3RyaW5nXCIsXG4gICAgICBnc2kyc2s6IFwic3RyaW5nXCIsXG4gICAgICBnc2kzcGs6IFwic3RyaW5nXCIsXG4gICAgICBnc2kzc2s6IFwic3RyaW5nXCIsXG4gICAgICBnc2k0cGs6IFwic3RyaW5nXCIsXG4gICAgICBnc2k0c2s6IFwic3RyaW5nXCIsXG4gICAgICBnc2k1cGs6IFwic3RyaW5nXCIsXG4gICAgICBnc2k1c2s6IFwic3RyaW5nXCIsXG4gICAgfSxcbiAgICBwcmltYXJ5SW5kZXg6IHtcbiAgICAgIHBhcnRpdGlvbktleTogXCJwa1wiLFxuICAgICAgc29ydEtleTogXCJza1wiLFxuICAgIH0sXG4gICAgZ2xvYmFsSW5kZXhlczoge1xuICAgICAgZ3NpMToge1xuICAgICAgICBwYXJ0aXRpb25LZXk6IFwiZ3NpMXBrXCIsXG4gICAgICAgIHNvcnRLZXk6IFwiZ3NpMXNrXCIsXG4gICAgICB9LFxuICAgICAgZ3NpMjoge1xuICAgICAgICBwYXJ0aXRpb25LZXk6IFwiZ3NpMnBrXCIsXG4gICAgICAgIHNvcnRLZXk6IFwiZ3NpMnNrXCIsXG4gICAgICB9LFxuICAgICAgZ3NpMzoge1xuICAgICAgICBwYXJ0aXRpb25LZXk6IFwiZ3NpM3BrXCIsXG4gICAgICAgIHNvcnRLZXk6IFwiZ3NpM3NrXCIsXG4gICAgICB9LFxuICAgICAgZ3NpNDoge1xuICAgICAgICBwYXJ0aXRpb25LZXk6IFwiZ3NpNHBrXCIsXG4gICAgICAgIHNvcnRLZXk6IFwiZ3NpNHNrXCIsXG4gICAgICB9LFxuICAgICAgZ3NpNToge1xuICAgICAgICBwYXJ0aXRpb25LZXk6IFwiZ3NpNXBrXCIsXG4gICAgICAgIHNvcnRLZXk6IFwiZ3NpNXNrXCIsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldHVybiB0YWJsZTtcbn1cbiIsICJpbXBvcnQgeyBTdGFja0NvbnRleHQgfSBmcm9tIFwic3N0L2NvbnN0cnVjdHNcIjtcbmltcG9ydCB7XG4gIERuc1ZhbGlkYXRlZENlcnRpZmljYXRlLFxuICBJQ2VydGlmaWNhdGUsXG59IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY2VydGlmaWNhdGVtYW5hZ2VyXCI7XG5pbXBvcnQgeyBIb3N0ZWRab25lIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1yb3V0ZTUzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBEbnNTdGFjayh7IHN0YWNrLCBhcHAgfTogU3RhY2tDb250ZXh0KSB7XG4gIGNvbnN0IGhvc3RlZFpvbmVOYW1lID1cbiAgICBhcHAuc3RhZ2UgPT09IFwicHJvZFwiID8gYGZsaXZpdHkuY29tYCA6IGAke2FwcC5zdGFnZX0uZmxpdml0eS5jb21gO1xuICBjb25zdCBob3N0ZWRab25lID0gaG9zdGVkWm9uZU5hbWVcbiAgICA/IEhvc3RlZFpvbmUuZnJvbUxvb2t1cChzdGFjaywgXCJab25lXCIsIHtcbiAgICAgICAgZG9tYWluTmFtZTogaG9zdGVkWm9uZU5hbWUsXG4gICAgICB9KVxuICAgIDogdW5kZWZpbmVkO1xuXG4gIGxldCBjZXJ0aWZpY2F0ZVJlZ2lvbmFsOiBJQ2VydGlmaWNhdGUgfCB1bmRlZmluZWQsXG4gICAgY2VydGlmaWNhdGVHbG9iYWw6IElDZXJ0aWZpY2F0ZSB8IHVuZGVmaW5lZDtcblxuICBpZiAoaG9zdGVkWm9uZU5hbWUgJiYgaG9zdGVkWm9uZSkge1xuICAgIGNlcnRpZmljYXRlUmVnaW9uYWwgPSBuZXcgRG5zVmFsaWRhdGVkQ2VydGlmaWNhdGUoXG4gICAgICBzdGFjayxcbiAgICAgIFwiUmVnaW9uYWxDZXJ0aWZpY2F0ZVwiLFxuICAgICAge1xuICAgICAgICBkb21haW5OYW1lOiBob3N0ZWRab25lTmFtZSxcbiAgICAgICAgaG9zdGVkWm9uZSxcbiAgICAgICAgc3ViamVjdEFsdGVybmF0aXZlTmFtZXM6IFtgKi4ke2hvc3RlZFpvbmVOYW1lfWBdLFxuICAgICAgfVxuICAgICk7XG5cbiAgICBjZXJ0aWZpY2F0ZUdsb2JhbCA9XG4gICAgICBhcHAucmVnaW9uID09PSBcInVzLWVhc3QtMVwiXG4gICAgICAgID8gY2VydGlmaWNhdGVSZWdpb25hbFxuICAgICAgICA6IG5ldyBEbnNWYWxpZGF0ZWRDZXJ0aWZpY2F0ZShzdGFjaywgXCJHbG9iYWxDZXJ0aWZpY2F0ZVwiLCB7XG4gICAgICAgICAgICBkb21haW5OYW1lOiBob3N0ZWRab25lTmFtZSxcbiAgICAgICAgICAgIGhvc3RlZFpvbmUsXG4gICAgICAgICAgICBzdWJqZWN0QWx0ZXJuYXRpdmVOYW1lczogW2AqLiR7aG9zdGVkWm9uZU5hbWV9YF0sXG4gICAgICAgICAgICByZWdpb246IFwidXMtZWFzdC0xXCIsXG4gICAgICAgICAgfSk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNlcnRpZmljYXRlUmVnaW9uYWwsXG4gICAgY2VydGlmaWNhdGVHbG9iYWwsXG4gICAgaG9zdGVkWm9uZSxcbiAgICBkb21haW5OYW1lOiBob3N0ZWRab25lTmFtZSxcbiAgfTtcbn1cbiIsICJpbXBvcnQgeyB1c2UsIFN0YXRpY1NpdGUsIFN0YWNrQ29udGV4dCB9IGZyb20gXCJzc3QvY29uc3RydWN0c1wiO1xuXG5pbXBvcnQgeyBBcGlTdGFjayB9IGZyb20gXCIuL0FwaVN0YWNrXCI7XG5pbXBvcnQgeyBEbnNTdGFjayB9IGZyb20gXCIuL0Ruc1N0YWNrXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBGcm9udGVuZFN0YWNrKHsgc3RhY2ssIGFwcCB9OiBTdGFja0NvbnRleHQpIHtcbiAgY29uc3QgYXBpID0gdXNlKEFwaVN0YWNrKTtcbiAgY29uc3QgZG5zID0gdXNlKERuc1N0YWNrKTtcblxuICBjb25zdCBzaXRlID0gbmV3IFN0YXRpY1NpdGUoc3RhY2ssIFwiZnJvbnRlbmRcIiwge1xuICAgIHBhdGg6IFwid2ViXCIsXG4gICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgIFJFQUNUX0FQUF9BUElfVVJMOiBhcGkuY3VzdG9tRG9tYWluVXJsIHx8IGFwaS51cmwsXG4gICAgICBSRUFDVF9BUFBfVVJMOiBhcGkuY3VzdG9tRG9tYWluVXJsISxcbiAgICB9LFxuICAgIGJ1aWxkT3V0cHV0OiBcImJ1aWxkXCIsXG4gICAgYnVpbGRDb21tYW5kOiBcIm5wbSBydW4gYnVpbGRcIixcbiAgICBjdXN0b21Eb21haW46IHtcbiAgICAgIGRvbWFpbk5hbWU6XG4gICAgICAgIGFwcC5zdGFnZSA9PT0gXCJwcm9kXCIgPyBgZmxpdml0eS5jb21gIDogYCR7YXBwLnN0YWdlfS5mbGl2aXR5LmNvbWAsXG4gICAgICBjZGs6IHtcbiAgICAgICAgaG9zdGVkWm9uZTogZG5zLmhvc3RlZFpvbmUsXG4gICAgICAgIGNlcnRpZmljYXRlOiBkbnMuY2VydGlmaWNhdGVHbG9iYWwsXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuXG4gIC8vIFNob3cgdGhlIHVybCBpbiB0aGUgb3V0cHV0XG4gIHN0YWNrLmFkZE91dHB1dHMoe1xuICAgIFNJVEU6IHNpdGUudXJsIHx8IFwiXCIsXG4gIH0pO1xuXG4gIHJldHVybiBzaXRlO1xufVxuIiwgImltcG9ydCB7IFNTVENvbmZpZyB9IGZyb20gXCJzc3RcIjtcbmltcG9ydCB7IEFwaVN0YWNrIH0gZnJvbSBcIi4vc3RhY2tzL0FwaVN0YWNrXCI7XG5pbXBvcnQgeyBEYXRhYmFzZVN0YWNrIH0gZnJvbSBcIi4vc3RhY2tzL0RhdGFiYXNlU3RhY2tcIjtcbmltcG9ydCB7IERuc1N0YWNrIH0gZnJvbSBcIi4vc3RhY2tzL0Ruc1N0YWNrXCI7XG5pbXBvcnQgeyBGcm9udGVuZFN0YWNrIH0gZnJvbSBcIi4vc3RhY2tzL0Zyb250ZW5kU3RhY2tcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBjb25maWcoX2lucHV0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IFwiZmxpdml0eVwiLFxuICAgICAgcmVnaW9uOiBcImV1LXdlc3QtMVwiLFxuICAgIH07XG4gIH0sXG4gIHN0YWNrcyhhcHApIHtcbiAgICBpZiAoYXBwLnN0YWdlICE9PSBcInByb2RcIikge1xuICAgICAgYXBwLnNldERlZmF1bHRSZW1vdmFsUG9saWN5KFwiZGVzdHJveVwiKTtcbiAgICB9XG5cbiAgICBhcHAuc2V0RGVmYXVsdEZ1bmN0aW9uUHJvcHMoe1xuICAgICAgcnVudGltZTogXCJub2RlanMxNi54XCIsXG4gICAgICBhcmNoaXRlY3R1cmU6IFwiYXJtXzY0XCIsXG4gICAgfSk7XG5cbiAgICBhcHBcbiAgICAgIC5zdGFjayhEbnNTdGFjaylcbiAgICAgIC5zdGFjayhEYXRhYmFzZVN0YWNrKVxuICAgICAgLnN0YWNrKEFwaVN0YWNrKVxuICAgICAgLnN0YWNrKEZyb250ZW5kU3RhY2spO1xuICB9LFxufSBzYXRp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
