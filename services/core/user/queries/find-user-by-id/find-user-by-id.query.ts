import { Query, QueryProps } from "@services/libs/base/queries/query.base";

export class FindUserByIdQuery extends Query {
  constructor(props: FindUserByIdQuery) {
    super();
    this.id = props.id;
  }

  readonly id: string;
}
