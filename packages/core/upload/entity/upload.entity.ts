import KSUID from "ksuid";
import { removeUndefined } from "../../../libs/filter";
import { EntityBase } from "../../../libs/base/classes/entity.base";
import {
  CreateUploadProps,
  UpdateUploadProps,
} from "./props/upload.entity-props";
import { UploadRepository } from "../database/upload.repository";

export interface UploadProps extends CreateUploadProps {}

export class UploadEntity extends EntityBase<UploadProps> {
  protected declare readonly _id: string;

  repository = new UploadRepository();

  get uploadID() {
    return this.props.uploadID;
  }

  get uploadKey() {
    return this.props.uploadKey;
  }

  get uploadPart() {
    return this.props.uploadPart;
  }

  get uploadTotal() {
    return this.props.uploadTotal;
  }

  get fileSize() {
    return this.props.fileSize;
  }

  get fileType() {
    return this.props.fileType;
  }

  static async create(create: CreateUploadProps) {
    const repository = new UploadRepository();

    const props: UploadProps = {
      uploadID: create.uploadID,
      uploadKey: create.uploadKey,
      uploadTotal: create.uploadTotal,
      fileSize: create.fileSize,
      fileType: create.fileType,
    };

    const user = new UploadEntity({
      id: KSUID.randomSync().string,
      props: props,
    });

    return await repository.save(user);
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
