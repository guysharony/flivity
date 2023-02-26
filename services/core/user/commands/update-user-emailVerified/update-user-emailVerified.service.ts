import { Err, Ok, Result } from "oxide.ts";

import { CommandService } from "@services/libs/base/commands/command.base-service";

import { UserRepository } from "../../database/user.repository";

import { UpdateUserEmailVerifiedCommand } from "./update-user-emailVerified.command";
import { UserNotFoundError } from "../../errors/user-not-found.error";

export class UpdateUserEmailVerifiedService extends CommandService {
  async handler(
    command: UpdateUserEmailVerifiedCommand
  ): Promise<Result<boolean, UserNotFoundError>> {
    const userRepository = new UserRepository();

    const found = await userRepository.findById(command.id);
    if (found.isNone()) {
      return Err(new UserNotFoundError());
    }

    const user = found.unwrap();

    await user.update({
      hasEmailVerified: true,
    });

    return Ok(true);
  }
}
