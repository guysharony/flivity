import { Query, QueryProps } from "@packages/libs/base/queries/query.base";

export class FindSessionByIdQuery extends Query {
  constructor(props: FindSessionByIdQuery) {
    super();
    this.id = props.id;
  }

  readonly id: string;
}
