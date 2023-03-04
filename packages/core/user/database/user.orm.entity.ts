import { OrmEntityBase } from "@services/libs/base/classes/orm.entity.base";

export class UserOrmEntity extends OrmEntityBase {
  constructor(props?: UserOrmEntity) {
    super(props);
  }

  declare firstName?: string;
  declare lastName?: string;
  declare displayName?: string;
  declare email: string;
  declare username?: string;
  declare hasEmailVerified?: boolean;
  declare hasAccountConfigured?: boolean;
}
