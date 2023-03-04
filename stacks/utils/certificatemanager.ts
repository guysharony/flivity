import {
  Certificate,
  CertificateProps,
} from "aws-cdk-lib/aws-certificatemanager";
import { App } from "sst/constructs";

interface IDnsValidateCertificate extends CertificateProps {
  region?: string;
}

export class DnsCertificate extends Certificate {
  constructor(scope: App, id: string, props: IDnsValidateCertificate) {
    const { region = scope.region, ...certificateProps } = props;

    super(new App({ ...scope, region }), id, certificateProps);
  }
}
