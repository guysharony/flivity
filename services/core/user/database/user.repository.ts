import { None, Option, Some } from "oxide.ts";

import { UserOrmEntity } from "./user.orm.entity";
import { UserElectroDBRepository } from "./user.electrodb.repository";
import { OrmRepositoryBase } from "../../../libs/base/classes/orm.repository.base";
import { UserEntity } from "../entity/user.entity";
import { UserOrmProperty } from "./user.orm.property";
import { UserDomainProperty } from "./user.domain.property";

export class UserRepository extends OrmRepositoryBase<
  UserEntity,
  UserOrmEntity
> {
  private readonly userRepository: UserElectroDBRepository;

  constructor() {
    const userRepository = new UserElectroDBRepository();
    super(
      userRepository,
      new UserOrmProperty(UserOrmEntity),
      new UserDomainProperty(UserEntity)
    );
    this.userRepository = userRepository;
  }

  async findByEmail(email: string): Promise<Option<UserEntity>> {
    const user = await this.userRepository.findByEmail(email);

    if (!user.length) {
      return None;
    }

    return Some(this.domainProperty.toEntity(user[0] as UserOrmEntity));
  }

  async findByUsername(username: string): Promise<Option<UserEntity>> {
    const user = await this.userRepository.findByUsername(username);

    if (!user.length) {
      return None;
    }

    return Some(this.domainProperty.toEntity(user[0] as UserOrmEntity));
  }
}
