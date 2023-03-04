export interface ElectroDBRepositoryBase<OrmEntity> {
  save(entity: OrmEntity): Promise<OrmEntity>;
  delete(entity: OrmEntity): Promise<void>;
  update(id: string, params: DeepPartial<OrmEntity>): Promise<unknown>;

  findById(id: string): Promise<OrmEntity>;
}
