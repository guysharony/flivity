import { CreateEntityProps, EntityBase } from "./entity.base";

export abstract class DomainPropertyBase<
  Entity extends EntityBase<unknown>,
  OrmEntity
> {
  constructor(
    private domainEntityConstructor: new (
      props: CreateEntityProps<any>
    ) => Entity
  ) {}

  abstract toDomain(ormEntity: OrmEntity): CreateEntityProps<unknown>;

  toEntity(ormEntity: any): Entity {
    const { id, props } = this.toDomain(ormEntity);

    return new this.domainEntityConstructor({
      id,
      props,
    });
  }
}
