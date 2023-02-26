import { Ok, Result, Err } from "oxide.ts";

import { QueryService } from "@services/libs/base/queries/query.base-service";

import { SessionRepository } from "../../database/session.repository";

import { SessionNotFoundError } from "../../errors/session-not-found.error";
import { SessionEntity } from "../../entity/session.entity";

import { FindSessionQuery } from "./find-session.query";

export class FindSessionService extends QueryService {
  async handler(
    query: FindSessionQuery
  ): Promise<Result<SessionEntity, SessionNotFoundError>> {
    const sessionRepository = new SessionRepository();

    const found = await sessionRepository.findByToken(query.email, query.token);
    if (found.isNone()) {
      return Err(new SessionNotFoundError());
    }

    const session = found.unwrap();

    return Ok(session);
  }
}
