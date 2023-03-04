import { Query, QueryProps } from "@packages/libs/base/queries/query.base";

export class FindUserByIdQuery extends Query {
  constructor(props: FindUserByIdQuery) {
    super();
    this.id = props.id;
  }

  readonly id: string;
}
