import { Err, Ok, Result } from "oxide.ts";

import { CommandService } from "@packages/libs/base/commands/command.base-service";

import { UploadRepository } from "../../database/upload.repository";

import { UploadEntity } from "../../entity/upload.entity";

import { DeleteUploadCommand } from "./delete-upload.command";
import { UploadNotFoundError } from "../../errors/upload-not-found.error";

export class DeleteUploadService extends CommandService {
  async handler(
    command: DeleteUploadCommand
  ): Promise<Result<string, UploadNotFoundError>> {
    const uploadRepository = new UploadRepository();

    const found = await uploadRepository.findByUploadID(command.uploadID);
    if (found.isNone()) {
      return Err(new UploadNotFoundError());
    }

    const upload = found.unwrap();

    await uploadRepository.delete(upload);

    return Ok(upload.id);
  }
}
