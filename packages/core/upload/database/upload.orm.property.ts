import { UploadOrmEntity } from "./upload.orm.entity";
import { UploadEntity } from "../entity/upload.entity";

import {
  OrmEntityProps,
  OrmPropertyBase,
} from "../../../libs/base/classes/orm.property.base";

export class UploadOrmProperty extends OrmPropertyBase<
  UploadEntity,
  UploadOrmEntity
> {
  toCreate(entity: UploadEntity): OrmEntityProps<UploadOrmEntity> {
    const props = entity.props;

    const ormProps = {
      uploadID: props.uploadID,
      uploadKey: props.uploadKey,
      uploadPart: props.uploadPart,
      uploadTotal: props.uploadTotal,
      fileSize: props.fileSize,
      fileType: props.fileType,
    };

    return ormProps;
  }

  toUpdate(entity: UploadEntity): DeepPartial<UploadOrmEntity> {
    const props = entity.props;

    const ormProps = {
      uploadID: props.uploadID,
      uploadKey: props.uploadKey,
      uploadPart: props.uploadPart,
      uploadTotal: props.uploadTotal,
      fileSize: props.fileSize,
      fileType: props.fileType,
    };

    return ormProps;
  }
}
