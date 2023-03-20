import path from "path";
import { Err, Ok, Result } from "oxide.ts";

import { VideoEntity } from "@packages/core/video/entity/video.entity";
import { UploadEntity } from "@packages/core/upload/entity/upload.entity";

import { CommandService } from "@packages/libs/base/commands/command.base-service";

import { VideoRepository } from "@packages/core/video/database/video.repository";
import { UploadRepository } from "@packages/core/upload/database/upload.repository";

import { VideoAlreadyExistsError } from "@packages/core/video/errors/video-already-exists.error";

import { CreateVideoCommand } from "./create-video.command";
import { VideoStatus } from "../../enum/status.enum";
import { CreateUploadService } from "@packages/core/upload/commands/create-upload/create-upload.service";
import { CreateUploadCommand } from "@packages/core/upload/commands/create-upload/create-upload.command";

export class CreateVideoService extends CommandService {
  async handler(
    command: CreateVideoCommand
  ): Promise<Result<VideoEntity, VideoAlreadyExistsError>> {
    const videoRepository = new VideoRepository();
    const uploadRepository = new UploadRepository();

    const video = await VideoEntity.create({
      title: command.filename,
      authorID: command.authorID,
    });

    await this.createUpload(video);

    return Ok(video);
  }

  private async createUpload(video: VideoEntity) {
    /*
		
		this.uploadID = props.uploadID;
    this.uploadKey = props.uploadKey;
    this.uploadTotal = props.uploadTotal;
    this.fileSize = props.fileSize;
    this.fileType = props.fileType;
		
		*/

    const command = new CreateUploadCommand({
      uploadID: video.uploadID!,
      uploadKey: path.join(video.authorID, video.id),
      fileSize: 3000,
      fileType: "mp4",
    });

    const service = new CreateUploadService();

    return await service.handler(command);
  }
}
