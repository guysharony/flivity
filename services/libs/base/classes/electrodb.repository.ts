import { ElectroDBRepositoryBase } from "./electrodb.repository.base";

export class ElectroDBRepository<OrmEntity>
  implements ElectroDBRepositoryBase<OrmEntity>
{
  protected readonly entity: any;

  async save(ormEntity: OrmEntity): Promise<OrmEntity> {
    const result = await this.entity.create(ormEntity).go();
    return result.data;
  }

  async delete(entity: OrmEntity): Promise<void> {
    await this.entity.delete(entity).go();
  }

  async update(id: string, props: Record<string, any>): Promise<OrmEntity> {
    const result = await this.entity.update({ id }).set(props).go();

    return result.data;
  }

  async findById(id: string): Promise<OrmEntity> {
    const result = await this.entity.get({ id }).go();

    return result.data;
  }
}
