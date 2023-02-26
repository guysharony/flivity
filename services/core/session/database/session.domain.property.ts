import { SessionOrmEntity } from "./session.orm.entity";
import { SessionEntity, SessionProps } from "../entity/session.entity";

import { DomainPropertyBase } from "../../../libs/base/classes/domain.property.base";
import { CreateEntityProps } from "../../../libs/base/classes/entity.base";

export class SessionDomainProperty extends DomainPropertyBase<
  SessionEntity,
  SessionOrmEntity
> {
  toDomain(ormEntity: SessionOrmEntity): CreateEntityProps<SessionProps> {
    const props: SessionProps = {
      token: ormEntity.token,
      email: ormEntity.email,
      userId: ormEntity.userId,
    };

    return { id: ormEntity.id, props };
  }
}
