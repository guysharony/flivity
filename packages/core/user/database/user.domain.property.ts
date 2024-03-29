import { UserOrmEntity } from "./user.orm.entity";
import { UserEntity, UserProps } from "../entity/user.entity";

import { DomainPropertyBase } from "../../../libs/base/classes/domain.property.base";
import { CreateEntityProps } from "../../../libs/base/classes/entity.base";

export class UserDomainProperty extends DomainPropertyBase<
  UserEntity,
  UserOrmEntity
> {
  toDomain(ormEntity: UserOrmEntity): CreateEntityProps<UserProps> {
    const props: UserProps = {
      firstName: ormEntity.firstName,
      lastName: ormEntity.lastName,
      email: ormEntity.email,
      hasEmailVerified: ormEntity.hasEmailVerified,
      hasAccountConfigured: ormEntity.hasAccountConfigured,
    };

    return { id: ormEntity.id, props };
  }
}
