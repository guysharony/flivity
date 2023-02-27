import { Query } from "@services/libs/base/queries/query.base";

export class FindUserByUsernameQuery extends Query {
  constructor(props: FindUserByUsernameQuery) {
    super();
    this.username = props.username;
  }

  readonly username: string;
}
