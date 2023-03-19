import { OrmEntityBase } from "@packages/libs/base/classes/orm.entity.base";

export class UploadOrmEntity extends OrmEntityBase {
  constructor(props?: UploadOrmEntity) {
    super(props);
  }

  declare uploadID?: string;
  declare uploadKey?: string;
  declare uploadPart?: number;
  declare uploadTotal?: number;
  declare fileSize?: number;
  declare fileType?: string;
}
