import { Query } from "@packages/libs/base/queries/query.base";

export class FindVideoByAuthorIDQuery extends Query {
  constructor(props: FindVideoByAuthorIDQuery) {
    super();
    this.authorID = props.authorID;
  }

  readonly authorID: string;
}
