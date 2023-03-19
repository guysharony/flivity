import { UploadOrmEntity } from "./upload.orm.entity";
import { UploadEntity, UploadProps } from "../entity/upload.entity";

import { DomainPropertyBase } from "../../../libs/base/classes/domain.property.base";
import { CreateEntityProps } from "../../../libs/base/classes/entity.base";

export class UploadDomainProperty extends DomainPropertyBase<
  UploadEntity,
  UploadOrmEntity
> {
  toDomain(ormEntity: UploadOrmEntity): CreateEntityProps<UploadProps> {
    const props: UploadProps = {
      uploadID: ormEntity.uploadID,
      uploadKey: ormEntity.uploadKey,
      uploadPart: ormEntity.uploadPart,
      uploadTotal: ormEntity.uploadTotal,
      fileSize: ormEntity.fileSize,
      fileType: ormEntity.fileType,
    };

    return { id: ormEntity.id, props };
  }
}
