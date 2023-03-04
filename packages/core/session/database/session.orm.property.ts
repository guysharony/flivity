import { SessionOrmEntity } from "./session.orm.entity";
import { SessionEntity } from "../entity/session.entity";

import {
  OrmEntityProps,
  OrmPropertyBase,
} from "../../../libs/base/classes/orm.property.base";

export class SessionOrmProperty extends OrmPropertyBase<
  SessionEntity,
  SessionOrmEntity
> {
  toCreate(entity: SessionEntity): OrmEntityProps<SessionOrmEntity> {
    const props = entity.props;

    const ormProps = {
      token: props.token,
      email: props.email,
      userId: props.userId,
    };

    return ormProps;
  }

  toUpdate(entity: SessionEntity): DeepPartial<SessionOrmEntity> {
    const props = entity.props;

    const ormProps = {
      token: props.token,
      email: props.email,
      userId: props.userId,
    };

    return ormProps;
  }
}
