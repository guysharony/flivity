import KSUID from "ksuid";
import { removeUndefined } from "../../../libs/filter";
import { EntityBase } from "../../../libs/base/classes/entity.base";
import {
  CreateUploadProps,
  UpdateUploadProps,
} from "./props/upload.entity-props";
import { UploadRepository } from "../database/upload.repository";
import path from "path";
import { CreateMultipartUploadCommand } from "@aws-sdk/client-s3";

export interface UploadProps extends Omit<CreateUploadProps, "id"> {}

export class UploadEntity extends EntityBase<UploadProps> {
  protected declare readonly _id: string;

  repository = new UploadRepository();

  get uploadKey() {
    return this.props.uploadKey;
  }

  get uploadPart() {
    return this.props.uploadPart;
  }

  get uploadPartSize() {
    return 1024 * 1025 * 5;
  }

  get uploadTotal() {
    return this.fileSize / this.uploadPartSize;
  }

  get fileSize() {
    return this.props.fileSize!;
  }

  get fileType() {
    return this.props.fileType;
  }

  static async create(create: CreateUploadProps) {
    const repository = new UploadRepository();

    const multipartUploadCommand = new CreateMultipartUploadCommand({
      Bucket: videoBucket,
      Key: key,
    });

    const response = await s3.send(multipartUploadCommand);

    const props: UploadProps = {
      uploadKey: create.uploadKey,
      fileSize: create.fileSize,
      fileType: create.fileType,
    };

    const upload = new UploadEntity({
      id: create.id,
      props: props,
    });

    return await repository.save(upload);
  }

  async update(update: UpdateUploadProps) {
    const filtered = removeUndefined(update);

    this.props = {
      ...this.props,
      ...filtered,
    };

    return await this.repository.update(this.id, this);
  }

  async delete() {
    return await this.repository.delete(this);
  }
}
