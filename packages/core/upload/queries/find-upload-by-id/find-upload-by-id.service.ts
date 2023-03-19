import { Ok, Result, Err } from "oxide.ts";

import { QueryService } from "@packages/libs/base/queries/query.base-service";
import { FindUploadByIdQuery } from "./find-upload-by-id.query";
import { UploadEntity } from "../../entity/upload.entity";
import { UploadNotFoundError } from "../../errors/upload-not-found.error";
import { UploadRepository } from "../../database/upload.repository";

export class FindUploadByIdService extends QueryService {
  async handler(
    query: FindUploadByIdQuery
  ): Promise<Result<UploadEntity, UploadNotFoundError>> {
    const uploadRepository = new UploadRepository();

    const found = await uploadRepository.findById(query.id);
    if (found.isNone()) {
      return Err(new UploadNotFoundError());
    }

    const upload = found.unwrap();

    return Ok(upload);
  }
}
