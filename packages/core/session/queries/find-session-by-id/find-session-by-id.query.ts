import { Query, QueryProps } from "@services/libs/base/queries/query.base";

export class FindSessionByIdQuery extends Query {
  constructor(props: FindSessionByIdQuery) {
    super();
    this.id = props.id;
  }

  readonly id: string;
}
