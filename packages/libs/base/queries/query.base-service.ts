import { Result } from "oxide.ts";
import { Query } from "./query.base";

export abstract class QueryService<
  QueryServiceReturn = unknown,
  QueryServiceError extends Error = Error
> {
  abstract handler(
    query: Query
  ): Promise<Result<QueryServiceReturn, QueryServiceError>>;

  execute(query: Query) {
    return this.handler(query);
  }
}
