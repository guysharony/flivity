import { Ok, Result, Err } from "oxide.ts";

import { QueryService } from "@packages/libs/base/queries/query.base-service";

import { VideoNotFoundError } from "../../errors/video-not-found.error";
import { VideoRepository } from "../../database/video.repository";
import { VideoEntity } from "../../entity/video.entity";
import { FindVideoByIdQuery } from "./find-video-by-id.query";

export class FindVideoByIdService extends QueryService {
  async handler(
    query: FindVideoByIdQuery
  ): Promise<Result<VideoEntity, VideoNotFoundError>> {
    const videoRepository = new VideoRepository();

    const found = await videoRepository.findById(query.id);
    if (found.isNone()) {
      return Err(new VideoNotFoundError());
    }

    const video = found.unwrap();

    return Ok(video);
  }
}
