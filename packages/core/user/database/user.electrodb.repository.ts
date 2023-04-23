import { Entity } from "electrodb";

import { Dynamo } from "@packages/core/dynamo";
import { ElectroDBRepository } from "@packages/libs/base/classes/electrodb.repository";

import { UserOrmEntity } from "./user.orm.entity";

export * as User from "./user.electrodb.repository";

export const userEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "User",
      service: "app",
    },
    attributes: {
      id: {
        label: "userID",
        type: "string",
        required: true,
      },
      firstName: {
        type: "string",
        required: false,
      },
      lastName: {
        type: "string",
        required: false,
      },
      email: {
        type: "string",
        required: true,
      },
      hasEmailVerified: {
        type: "boolean",
        default: false,
        required: true,
      },
      hasAccountConfigured: {
        type: "boolean",
        default: false,
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: ["id"],
        },
        sk: {
          field: "sk",
          composite: [],
        },
      },
      byEmail: {
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["email"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["id"],
        },
      },
      byUsername: {
        index: "gsi2",
        pk: {
          field: "gsi2pk",
          composite: ["username"],
        },
        sk: {
          field: "gsi2sk",
          composite: ["id"],
        },
      },
    },
  },
  Dynamo.Configuration
);

export class UserElectroDBRepository extends ElectroDBRepository<UserOrmEntity> {
  protected readonly entity = userEntity;

  async findByEmail(email: string): Promise<unknown[]> {
    const result = await this.entity.query.byEmail({ email }).go();

    return result.data;
  }
}
