import {
  Certificate,
  CertificateProps,
} from "aws-cdk-lib/aws-certificatemanager";
import { App, Stack } from "sst/constructs";

interface IDnsCertificate extends CertificateProps {
  region?: string;
}

export function dnsCertificate(scope: App, id: string, props: IDnsCertificate) {
  const { region = scope.region, ...certificateProps } = props;

  return new Certificate(new App({ ...scope, region }), id, certificateProps);
}
