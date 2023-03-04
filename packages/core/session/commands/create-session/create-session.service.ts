import { Err, Ok, Result } from "oxide.ts";

import { CommandService } from "@packages/libs/base/commands/command.base-service";

import { SessionRepository } from "../../database/session.repository";

import { SessionEntity } from "../../entity/session.entity";
import { SessionAlreadyExistsError } from "../../errors/session-already-exists.error";

import { CreateSessionCommand } from "./create-session.command";

export class CreateSessionService extends CommandService {
  async handler(
    command: CreateSessionCommand
  ): Promise<Result<string, SessionAlreadyExistsError>> {
    const sessionRepository = new SessionRepository();

    const found = await sessionRepository.findByToken(
      command.email,
      command.token
    );
    if (!found.isNone()) {
      return Err(new SessionAlreadyExistsError());
    }

    const session = await SessionEntity.create({
      userId: command.userId,
      email: command.email,
      token: command.token,
    });

    return Ok(session.id);
  }
}
