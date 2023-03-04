import { OrmEntityBase } from "@packages/libs/base/classes/orm.entity.base";

export class SessionOrmEntity extends OrmEntityBase {
  declare userId: string;
  declare email: string;
  declare token: string;
}
