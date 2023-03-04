import { Query } from "@packages/libs/base/queries/query.base";

export class FindUserByEmailQuery extends Query {
  constructor(props: FindUserByEmailQuery) {
    super();
    this.email = props.email;
  }

  readonly email: string;
}
