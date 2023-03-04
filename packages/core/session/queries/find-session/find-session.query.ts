import { Query } from "@packages/libs/base/queries/query.base";

export class FindSessionQuery extends Query {
  constructor(props: FindSessionQuery) {
    super();
    this.email = props.email;
    this.token = props.token;
  }

  readonly email: string;
  readonly token: string;
}
