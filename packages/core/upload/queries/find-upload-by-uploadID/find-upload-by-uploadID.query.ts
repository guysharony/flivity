import { Query } from "@packages/libs/base/queries/query.base";

export class FindUploadByUploadIDQuery extends Query {
  constructor(props: FindUploadByUploadIDQuery) {
    super();
    this.uploadID = props.uploadID;
  }

  readonly uploadID: string;
}
