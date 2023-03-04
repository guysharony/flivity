import { StackContext } from "sst/constructs";
import {
  CertificateValidation,
  ICertificate,
} from "aws-cdk-lib/aws-certificatemanager";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import { dnsCertificate } from "./utils/certificatemanager";

export function DnsStack(this: any, { app }: StackContext) {
  const hostedZoneName =
    app.stage === "prod" ? `flivity.com` : `${app.stage}.flivity.com`;

  const hostedZone = hostedZoneName
    ? HostedZone.fromLookup(this, "Zone", {
        domainName: hostedZoneName,
      })
    : undefined;

  let certificateRegional: ICertificate | undefined,
    certificateGlobal: ICertificate | undefined;

  if (hostedZoneName && hostedZone) {
    certificateRegional = dnsCertificate(this, "RegionalCertificate", {
      domainName: hostedZoneName,
      subjectAlternativeNames: [`*.${hostedZoneName}`],
      validation: CertificateValidation.fromDns(hostedZone),
    });
    certificateGlobal =
      app.region === "us-east-1"
        ? certificateRegional
        : dnsCertificate(this, "GlobalCertificate", {
            domainName: hostedZoneName,
            subjectAlternativeNames: [`*.${hostedZoneName}`],
            region: "us-east-1",
            validation: CertificateValidation.fromDns(hostedZone),
          });
  }

  return {
    certificateRegional,
    certificateGlobal,
    hostedZone,
    domainName: hostedZoneName,
  };
}
