import { Ok, Result, Err } from "oxide.ts";

import { QueryService } from "@services/libs/base/queries/query.base-service";

import { UserNotFoundError } from "../../errors/user-not-found.error";

import { FindUserByIdQuery } from "./find-user-by-id.query";
import { UserRepository } from "../../database/user.repository";
import { UserEntity } from "../../entity/user.entity";

export class FindUserByIdService extends QueryService {
  async handler(
    query: FindUserByIdQuery
  ): Promise<Result<UserEntity, UserNotFoundError>> {
    const userRepository = new UserRepository();

    const found = await userRepository.findById(query.id);
    if (found.isNone()) {
      return Err(new UserNotFoundError());
    }

    const user = found.unwrap();

    return Ok(user);
  }
}
