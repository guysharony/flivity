import { Query } from "@packages/libs/base/queries/query.base";

export class FindVideoByIdQuery extends Query {
  constructor(props: FindVideoByIdQuery) {
    super();
    this.id = props.id;
  }

  readonly id: string;
}
