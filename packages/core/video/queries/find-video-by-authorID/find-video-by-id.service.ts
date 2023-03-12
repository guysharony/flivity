import { Ok, Result, Err } from "oxide.ts";

import { QueryService } from "@packages/libs/base/queries/query.base-service";

import { VideoNotFoundError } from "../../errors/video-not-found.error";
import { VideoRepository } from "../../database/video.repository";
import { VideoEntity } from "../../entity/video.entity";
import { FindVideoByAuthorIDQuery } from "./find-video-by-authorID.query";

export class FindVideoByAuthorIDService extends QueryService {
  async handler(
    query: FindVideoByAuthorIDQuery
  ): Promise<Result<VideoEntity[], VideoNotFoundError>> {
    const videoRepository = new VideoRepository();

    const videos = await videoRepository.findByAuthorID(query.authorID);
    return Ok(videos);
  }
}
