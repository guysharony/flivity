import { Err, Ok, Result } from "oxide.ts";

import { CommandService } from "@packages/libs/base/commands/command.base-service";

import { UploadRepository } from "../../database/upload.repository";

import { UploadEntity } from "../../entity/upload.entity";
import { UploadAlreadyExistsError } from "../../errors/upload-already-exists.error";

import { CreateUploadCommand } from "./create-upload.command";

export class CreateUploadService extends CommandService {
  async handler(
    command: CreateUploadCommand
  ): Promise<Result<string, UploadAlreadyExistsError>> {
    const uploadRepository = new UploadRepository();

    const found = await uploadRepository.findByUploadID(command.uploadID);
    if (!found.isNone()) {
      return Err(new UploadAlreadyExistsError());
    }

    const upload = await UploadEntity.create({
      uploadID: command.uploadID,
      uploadKey: command.uploadKey,
      fileSize: command.fileSize,
      fileType: command.fileType,
    });

    return Ok(upload.id);
  }
}
