import { Entity } from "aws-sdk/clients/costexplorer";
import { OrmRepositoryBase } from "./orm.repository.base";

export interface CreateEntityProps<T> {
  id: string;
  props: T;
}

export abstract class EntityBase<EntityProps> {
  protected abstract _id: string;
  protected _props: EntityProps;

  constructor({ id, props }: CreateEntityProps<EntityProps>) {
    this.id = id;
    this._props = props;
  }

  abstract repository: any;

  /* getters */
  public get id() {
    return this._id;
  }

  public get props() {
    const copy = {
      id: this.id,
      ...this._props,
    };

    return Object.freeze(copy);
  }

  /* setters */
  private set id(id: string) {
    this._id = id;
  }

  protected set props(props: EntityProps) {
    this._props = props;
  }
}
