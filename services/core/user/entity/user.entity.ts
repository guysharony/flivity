import KSUID from "ksuid";
import { removeUndefined } from "../../../libs/filter";
import { EntityBase } from "../../../libs/base/classes/entity.base";
import { CreateUserProps, UpdateUserProps } from "./props/user.entity-props";
import { UserRepository } from "../database/user.repository";

export interface UserProps extends CreateUserProps {}

export class UserEntity extends EntityBase<UserProps> {
  protected declare readonly _id: string;

  repository = new UserRepository();

  get firstName() {
    return this.props.firstName;
  }

  get lastName() {
    return this.props.lastName;
  }

  get email() {
    return this.props.email;
  }

  get displayName() {
    return this.props.displayName;
  }

  get username() {
    return this.props.username;
  }

  get hasEmailVerified() {
    return this.props.hasEmailVerified;
  }

  get hasAccountConfigured() {
    return this.props.hasAccountConfigured;
  }

  static async create(create: CreateUserProps) {
    const repository = new UserRepository();

    const props: UserProps = {
      email: create.email,
    };

    const user = new UserEntity({
      id: KSUID.randomSync().string,
      props: props,
    });

    return await repository.save(user);
  }

  async update(update: UpdateUserProps) {
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
