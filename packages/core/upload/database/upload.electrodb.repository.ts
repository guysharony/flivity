import { Entity } from "electrodb";

import { Dynamo } from "@packages/core/dynamo";
import { ElectroDBRepository } from "@packages/libs/base/classes/electrodb.repository";

import { UploadOrmEntity } from "./upload.orm.entity";

export * as Upload from "./upload.electrodb.repository";

export const uploadEntity = new Entity(
  {
    model: {
      version: "1",
      entity: "Upload",
      service: "app",
    },
    attributes: {
      id: {
        type: "string",
        required: true,
      },
      uploadID: {
        type: "string",
        required: true,
      },
      uploadKey: {
        type: "string",
        required: true,
      },
      uploadPart: {
        type: "number",
        default: 0,
        required: false,
      },
      fileSize: {
        type: "number",
        required: true,
      },
      fileType: {
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
      byUploadID: {
        index: "gsi1",
        pk: {
          field: "gsi1pk",
          composite: ["uploadID"],
        },
        sk: {
          field: "gsi1sk",
          composite: [],
        },
      },
    },
  },
  Dynamo.Configuration
);

export class UploadElectroDBRepository extends ElectroDBRepository<UploadOrmEntity> {
  protected readonly entity = uploadEntity;

  async findByUploadID(uploadID: string): Promise<unknown> {
    const result = await this.entity.query
      .byUploadID({ uploadID: uploadID })
      .go();

    return result.data;
  }
}
