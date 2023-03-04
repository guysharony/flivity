import { None, Option, Some } from "oxide.ts";

import { SessionOrmEntity } from "./session.orm.entity";
import { SessionElectroDBRepository } from "./session.electrodb.repository";
import { OrmRepositoryBase } from "@packages/libs/base/classes/orm.repository.base";
import { SessionEntity } from "../entity/session.entity";
import { SessionOrmProperty } from "./session.orm.property";
import { SessionDomainProperty } from "./session.domain.property";

export class SessionRepository extends OrmRepositoryBase<
  SessionEntity,
  SessionOrmEntity
> {
  private readonly sessionRepository: SessionElectroDBRepository;

  constructor() {
    const sessionRepository = new SessionElectroDBRepository();
    super(
      sessionRepository,
      new SessionOrmProperty(SessionOrmEntity),
      new SessionDomainProperty(SessionEntity)
    );
    this.sessionRepository = sessionRepository;
  }

  async findByEmail(email: string): Promise<Option<SessionEntity>> {
    const session = await this.sessionRepository.findByEmail(email);

    if (!session.length) {
      return None;
    }

    return Some(this.domainProperty.toEntity(session[0] as SessionOrmEntity));
  }

  async findByToken(
    email: string,
    token: string
  ): Promise<Option<SessionEntity>> {
    const session = await this.sessionRepository.findByToken(email, token);

    if (!session.length) {
      return None;
    }

    return Some(this.domainProperty.toEntity(session[0] as SessionOrmEntity));
  }
}
