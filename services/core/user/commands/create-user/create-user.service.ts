import { Err, Ok, Result } from "oxide.ts";

import { CommandService } from "@services/libs/base/commands/command.base-service";

import { UserRepository } from "../../database/user.repository";

import { UserEntity } from "../../entity/user.entity";
import { UserEmailAddressAlreadyTaken } from "../../errors/user-email-already-taken.error";

import { CreateUserCommand } from "./create-user.command";

export class CreateUserService extends CommandService {
  async handler(
    command: CreateUserCommand
  ): Promise<Result<string, UserEmailAddressAlreadyTaken>> {
    const userRepository = new UserRepository();

    const found = await userRepository.findByEmail(command.email);
    if (!found.isNone()) {
      return Err(new UserEmailAddressAlreadyTaken());
    }

    const user = await UserEntity.create({
      email: command.email,
    });

    return Ok(user.id);
  }
}
