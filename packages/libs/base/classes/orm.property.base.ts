import { CreateEntityProps, EntityBase } from "./entity.base";

export type OrmEntityProps<OrmEntity> = Omit<OrmEntity, "id">;

export abstract class OrmPropertyBase<
  Entity extends EntityBase<unknown>,
  OrmEntity
> {
  constructor(private ormEntityConstructor: new (props: any) => OrmEntity) {}

  abstract toCreate(entity: Entity): OrmEntityProps<OrmEntity>;

  abstract toUpdate(entity: Entity): DeepPartial<OrmEntity>;

  toEntity(entity: Entity): OrmEntity {
    const props = this.toCreate(entity);

    return new this.ormEntityConstructor({
      ...props,
      id: entity.id,
    });
  }
}
