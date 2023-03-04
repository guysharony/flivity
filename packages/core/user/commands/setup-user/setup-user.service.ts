import { Err, Ok, Result } from "oxide.ts";

import { CommandService } from "@packages/libs/base/commands/command.base-service";

import { UserRepository } from "../../database/user.repository";

import { UserNotFoundError } from "../../errors/user-not-found.error";
import { UserUsernameAlreadyTaken } from "../../errors/user-username-already-taken.error";

import { SetupUserCommand } from "./setup-user.command";
import { UserEntity } from "../../entity/user.entity";

export class SetupUserService extends CommandService {
  async handler(
    command: SetupUserCommand
  ): Promise<Result<UserEntity, UserNotFoundError | UserUsernameAlreadyTaken>> {
    const userRepository = new UserRepository();

    const found = await userRepository.findById(command.id);
    if (found.isNone()) {
      return Err(new UserNotFoundError());
    }

    const username = await userRepository.findByUsername(command.username);
    if (!username.isNone()) {
      return Err(new UserUsernameAlreadyTaken());
    }

    const user = found.unwrap();

    await user.update({
      firstName: command.firstName,
      lastName: command.lastName,
      displayName: command.displayName,
      username: command.username,
      hasAccountConfigured: true,
    });

    return Ok(user);
  }
}
