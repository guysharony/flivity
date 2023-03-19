import { Ok, Result, Err } from "oxide.ts";

import { QueryService } from "@packages/libs/base/queries/query.base-service";
import { FindUploadByUploadIDQuery } from "./find-upload-by-uploadID.query";
import { UploadEntity } from "../../entity/upload.entity";
import { UploadNotFoundError } from "../../errors/upload-not-found.error";
import { UploadRepository } from "../../database/upload.repository";

export class FindUploadByUploadIDService extends QueryService {
  async handler(
    query: FindUploadByUploadIDQuery
  ): Promise<Result<UploadEntity, UploadNotFoundError>> {
    const uploadRepository = new UploadRepository();

    const found = await uploadRepository.findByUploadID(query.uploadID);
    if (found.isNone()) {
      return Err(new UploadNotFoundError());
    }

    const upload = found.unwrap();

    return Ok(upload);
  }
}
