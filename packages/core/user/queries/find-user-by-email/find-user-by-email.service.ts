import { Ok, Result, Err } from "oxide.ts";

import { QueryService } from "@services/libs/base/queries/query.base-service";

import { UserRepository } from "../../database/user.repository";

import { UserNotFoundError } from "../../errors/user-not-found.error";
import { UserEntity } from "../../entity/user.entity";

import { FindUserByEmailQuery } from "./find-user-by-email.query";

export class FindUserByEmailService extends QueryService {
  async handler(
    query: FindUserByEmailQuery
  ): Promise<Result<UserEntity, UserNotFoundError>> {
    const userRepository = new UserRepository();

    const found = await userRepository.findByEmail(query.email);
    if (found.isNone()) {
      return Err(new UserNotFoundError());
    }

    const user = found.unwrap();

    return Ok(user);
  }
}
