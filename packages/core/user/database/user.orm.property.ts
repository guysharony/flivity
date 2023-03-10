import { UserOrmEntity } from "./user.orm.entity";
import { UserEntity, UserProps } from "../entity/user.entity";

import {
  OrmEntityProps,
  OrmPropertyBase,
} from "../../../libs/base/classes/orm.property.base";

export class UserOrmProperty extends OrmPropertyBase<
  UserEntity,
  UserOrmEntity
> {
  toCreate(entity: UserEntity): OrmEntityProps<UserOrmEntity> {
    const props = entity.props;

    const ormProps = {
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
      displayName: props.displayName,
      username: props.username,
      profilePicture: props.profilePicture,
      hasEmailVerified: props.hasEmailVerified,
      hasAccountConfigured: props.hasAccountConfigured,
    };

    return ormProps;
  }

  toUpdate(entity: UserEntity): DeepPartial<UserOrmEntity> {
    const props = entity.props;

    const ormProps = {
      firstName: props.firstName,
      lastName: props.lastName,
      displayName: props.displayName,
      email: props.email,
      username: props.username,
      profilePicture: props.profilePicture,
      hasEmailVerified: props.hasEmailVerified,
      hasAccountConfigured: props.hasAccountConfigured,
    };

    return ormProps;
  }
}
