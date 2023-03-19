import { None, Option, Some } from "oxide.ts";

import { UploadOrmEntity } from "./upload.orm.entity";
import { UploadElectroDBRepository } from "./upload.electrodb.repository";
import { OrmRepositoryBase } from "../../../libs/base/classes/orm.repository.base";
import { UploadEntity } from "../entity/upload.entity";
import { UploadOrmProperty } from "./upload.orm.property";
import { UploadDomainProperty } from "./upload.domain.property";

export class UploadRepository extends OrmRepositoryBase<
  UploadEntity,
  UploadOrmEntity
> {
  private readonly uploadRepository: UploadElectroDBRepository;

  constructor() {
    const uploadRepository = new UploadElectroDBRepository();
    super(
      uploadRepository,
      new UploadOrmProperty(UploadOrmEntity),
      new UploadDomainProperty(UploadEntity)
    );
    this.uploadRepository = uploadRepository;
  }

  async findByUploadID(uploadID: string): Promise<Option<UploadEntity>> {
    const upload = await this.uploadRepository.findByUploadID(uploadID);

    if (!upload) {
      return None;
    }

    return Some(this.domainProperty.toEntity(upload as UploadOrmEntity));
  }
}
