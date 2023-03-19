import { Query } from "@packages/libs/base/queries/query.base";

export class FindUploadByIdQuery extends Query {
  constructor(props: FindUploadByIdQuery) {
    super();
    this.id = props.id;
  }

  readonly id: string;
}
