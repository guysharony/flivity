import { OrmEntityBase } from "@packages/libs/base/classes/orm.entity.base";

export class VideoOrmEntity extends OrmEntityBase {
  constructor(props?: VideoOrmEntity) {
    super(props);
  }

  declare title?: string;
  declare description?: string;
  declare authorID?: string;
}
