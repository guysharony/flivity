import { Query } from "@packages/libs/base/queries/query.base";

export class FindUserByUsernameQuery extends Query {
  constructor(props: FindUserByUsernameQuery) {
    super();
    this.username = props.username;
  }

  readonly username: string;
}
