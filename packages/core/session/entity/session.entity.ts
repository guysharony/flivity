import KSUID from "ksuid";
import { removeUndefined } from "../../../libs/filter";
import { EntityBase } from "../../../libs/base/classes/entity.base";
import {
  CreateSessionProps,
  UpdateSessionProps,
} from "./props/session.entity-props";
import { SessionRepository } from "../database/session.repository";

export interface SessionProps extends CreateSessionProps {}

export class SessionEntity extends EntityBase<SessionProps> {
  protected declare readonly _id: string;

  repository = new SessionRepository();

  get userId() {
    return this.props.userId;
  }

  get email() {
    return this.props.email;
  }

  get token() {
    return this.props.token;
  }

  static async create(create: CreateSessionProps) {
    const repository = new SessionRepository();

    const props: SessionProps = {
      userId: create.userId,
      email: create.email,
      token: create.token,
    };

    const session = new SessionEntity({
      id: KSUID.randomSync().string,
      props: props,
    });

    return await repository.save(session);
  }

  async update(update: UpdateSessionProps) {
    const filtered = removeUndefined(update);

    this.props = {
      ...this.props,
      ...filtered,
    };

    return await this.repository.update(this.id, this);
  }

  async delete() {
    return await this.repository.delete(this);
  }
}
