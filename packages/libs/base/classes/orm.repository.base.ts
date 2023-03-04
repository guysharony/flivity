import { None, Option, Some } from "oxide.ts";
import { ElectroDBRepositoryBase } from "./electrodb.repository.base";
import { EntityBase } from "./entity.base";
import { OrmPropertyBase } from "./orm.property.base";
import { DomainPropertyBase } from "./domain.property.base";

export abstract class OrmRepositoryBase<
  Entity extends EntityBase<unknown>,
  OrmEntity
> {
  protected constructor(
    protected readonly repository: ElectroDBRepositoryBase<OrmEntity>,
    protected readonly ormProperty: OrmPropertyBase<Entity, OrmEntity>,
    protected readonly domainProperty: DomainPropertyBase<Entity, OrmEntity>
  ) {}

  async save(entity: Entity): Promise<Entity> {
    const ormEntity = this.ormProperty.toEntity(entity);

    const result = await this.repository.save(ormEntity);

    return this.domainProperty.toEntity(result);
  }

  async delete(entity: Entity): Promise<Entity> {
    const ormEntity = this.ormProperty.toEntity(entity);

    await this.repository.delete(ormEntity);

    return entity;
  }

  async update(id: string, params: Entity) {
    const ormEntity = this.ormProperty.toUpdate(params);

    await this.repository.update(id, ormEntity);

    return true;
  }

  async findById(id: string): Promise<Option<Entity>> {
    const result = await this.repository.findById(id);

    if (!result) {
      return None;
    }

    return Some(this.domainProperty.toEntity(result));
  }
}
