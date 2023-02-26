import { Entity } from "electrodb";

import { Dynamo } from "@services/core/dynamo";
import { ElectroDBRepository } from "@services/libs/base/classes/electrodb.repository";

import { SessionOrmEntity } from "./session.orm.entity";

export * as Session from "./session.electrodb.repository";

export const sessionEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Session",
      service: "app",
    },
    attributes: {
      id: {
        label: "sessionID",
        type: "string",
        required: true,
      },
      userId: {
        type: "string",
        required: true,
      },
      email: {
        type: "string",
        required: true,
      },
      token: {
        type: "string",
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
      byToken: {
        index: "gsi2",
        pk: {
          field: "gsi2pk",
          composite: ["email", "token"],
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

export class SessionElectroDBRepository extends ElectroDBRepository<SessionOrmEntity> {
  protected readonly entity = sessionEntity;

  async findByEmail(email: string): Promise<unknown[]> {
    const result = await this.entity.query.byEmail({ email }).go();

    return result.data;
  }

  async findByToken(email: string, token: string): Promise<unknown[]> {
    const result = await this.entity.query.byToken({ email, token }).go();

    return result.data;
  }
}
