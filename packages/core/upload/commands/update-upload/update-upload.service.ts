import { Err, Ok, Result } from "oxide.ts";

import { CommandService } from "@packages/libs/base/commands/command.base-service";

import { UploadRepository } from "../../database/upload.repository";

import { UpdateUploadCommand } from "./update-upload.command";
import { UploadNotFoundError } from "../../errors/upload-not-found.error";

export class UpdateUploadService extends CommandService {
  async handler(
    command: UpdateUploadCommand
  ): Promise<Result<string, UploadNotFoundError>> {
    const uploadRepository = new UploadRepository();

    const found = await uploadRepository.findByUploadID(command.uploadID);
    if (found.isNone()) {
      return Err(new UploadNotFoundError());
    }

    const upload = found.unwrap();

    await upload.update({
      uploadPart: command.uploadPart,
    });

    return Ok(upload.id);
  }
}
