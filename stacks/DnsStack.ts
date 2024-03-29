import { StackContext } from "sst/constructs";
import {
  DnsValidatedCertificate,
  ICertificate,
} from "aws-cdk-lib/aws-certificatemanager";
import { HostedZone } from "aws-cdk-lib/aws-route53";

export function DnsStack({ stack, app }: StackContext) {
  const hostedZoneName =
    app.stage === "prod" ? `flivity.com` : `${app.stage}.flivity.com`;
  const hostedZone = hostedZoneName
    ? HostedZone.fromLookup(stack, "Zone", {
        domainName: hostedZoneName,
      })
    : undefined;

  let certificateRegional: ICertificate | undefined,
    certificateGlobal: ICertificate | undefined;

  if (hostedZoneName && hostedZone) {
    certificateRegional = new DnsValidatedCertificate(
      stack,
      "RegionalCertificate",
      {
        domainName: hostedZoneName,
        hostedZone,
        subjectAlternativeNames: [`*.${hostedZoneName}`],
      }
    );

    certificateGlobal =
      app.region === "us-east-1"
        ? certificateRegional
        : new DnsValidatedCertificate(stack, "GlobalCertificate", {
            domainName: hostedZoneName,
            hostedZone,
            subjectAlternativeNames: [`*.${hostedZoneName}`],
            region: "us-east-1",
          });
  }

  return {
    certificateRegional,
    certificateGlobal,
    hostedZone,
    domainName: hostedZoneName,
  };
}
