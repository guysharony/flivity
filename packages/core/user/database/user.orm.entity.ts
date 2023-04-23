import { OrmEntityBase } from "@packages/libs/base/classes/orm.entity.base";

export class UserOrmEntity extends OrmEntityBase {
  constructor(props?: UserOrmEntity) {
    super(props);
  }

  declare firstName?: string;
  declare lastName?: string;
  declare email: string;
  declare hasEmailVerified?: boolean;
  declare hasAccountConfigured?: boolean;
}
