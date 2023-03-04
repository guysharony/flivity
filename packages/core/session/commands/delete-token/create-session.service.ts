import { Err, Ok, Result } from "oxide.ts";

import { CommandService } from "@packages/libs/base/commands/command.base-service";

import { SessionRepository } from "../../database/session.repository";

import { SessionEntity } from "../../entity/session.entity";
import { SessionAlreadyExistsError } from "../../errors/session-already-exists.error";

import { DeleteSessionCommand } from "./delete-session.command";

export class DeleteSessionService extends CommandService {
  async handler(
    command: DeleteSessionCommand
  ): Promise<Result<string, SessionAlreadyExistsError>> {
    const sessionRepository = new SessionRepository();

    const found = await sessionRepository.findByToken(
      command.email,
      command.token
    );
    if (found.isNone()) {
      return Err(new SessionAlreadyExistsError());
    }

    const session = found.unwrap();

    await session.delete();

    return Ok(session.id);
  }
}
