import { Ok, Result, Err } from "oxide.ts";

import { QueryService } from "@packages/libs/base/queries/query.base-service";

import { SessionNotFoundError } from "../../errors/session-not-found.error";

import { FindSessionByIdQuery } from "./find-session-by-id.query";
import { SessionRepository } from "../../database/session.repository";
import { SessionEntity } from "../../entity/session.entity";

export class FindSessionByIdService extends QueryService {
  async handler(
    query: FindSessionByIdQuery
  ): Promise<Result<SessionEntity, SessionNotFoundError>> {
    const sessionRepository = new SessionRepository();

    const found = await sessionRepository.findById(query.id);
    if (found.isNone()) {
      return Err(new SessionNotFoundError());
    }

    const session = found.unwrap();

    return Ok(session);
  }
}
