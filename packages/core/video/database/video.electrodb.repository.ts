import { Entity } from "electrodb";

import { Dynamo } from "@packages/core/dynamo";
import { ElectroDBRepository } from "@packages/libs/base/classes/electrodb.repository";

import { VideoOrmEntity } from "./video.orm.entity";

export * as Video from "./video.electrodb.repository";

export const videoEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Video",
      service: "app",
    },
    attributes: {
      id: {
        type: "string",
        required: true,
      },
      title: {
        type: "string",
        required: false,
      },
      description: {
        type: "string",
        required: false,
      },
      authorID: {
        type: "string",
        required: true,
      },
    },
    indexes: {
      primary: {
        pk: {
          field: "pk",
          composite: [],
        },
        sk: {
          field: "sk",
          composite: ["id"],
        },
      },
      byAuthorID: {
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["authorID"],
        },
        sk: {
          field: "gsi1sk",
          composite: ["id"],
        },
      },
    },
  },
  Dynamo.Configuration
);

export class VideoElectroDBRepository extends ElectroDBRepository<VideoOrmEntity> {
  protected readonly entity = videoEntity;

  async findByAuthorID(authorID: string): Promise<unknown[]> {
    const result = await this.entity.query
      .byAuthorID({ authorID: authorID })
      .go();

    return result.data;
  }
}
