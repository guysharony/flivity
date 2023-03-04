import { Ok, Result, Err } from "oxide.ts";

import { QueryService } from "@services/libs/base/queries/query.base-service";

import { UserRepository } from "../../database/user.repository";

import { UserNotFoundError } from "../../errors/user-not-found.error";
import { UserEntity } from "../../entity/user.entity";

import { FindUserByUsernameQuery } from "./find-user-by-username.query";

export class FindUserByUsernameService extends QueryService {
  async handler(
    query: FindUserByUsernameQuery
  ): Promise<Result<UserEntity, UserNotFoundError>> {
    const userRepository = new UserRepository();

    const found = await userRepository.findByUsername(query.username);
    if (found.isNone()) {
      return Err(new UserNotFoundError());
    }

    const user = found.unwrap();

    return Ok(user);
  }
}
