import { None, Option, Some } from "oxide.ts";

import { VideoOrmEntity } from "./video.orm.entity";
import { VideoElectroDBRepository } from "./video.electrodb.repository";
import { OrmRepositoryBase } from "../../../libs/base/classes/orm.repository.base";
import { VideoEntity } from "../entity/video.entity";
import { VideoOrmProperty } from "./video.orm.property";
import { VideoDomainProperty } from "./video.domain.property";

export class VideoRepository extends OrmRepositoryBase<
  VideoEntity,
  VideoOrmEntity
> {
  private readonly videoRepository: VideoElectroDBRepository;

  constructor() {
    const videoRepository = new VideoElectroDBRepository();
    super(
      videoRepository,
      new VideoOrmProperty(VideoOrmEntity),
      new VideoDomainProperty(VideoEntity)
    );
    this.videoRepository = videoRepository;
  }

  async findByAuthorID(authorID: string): Promise<VideoEntity[]> {
    const videos = await this.videoRepository.findByAuthorID(authorID);

    return videos.map((video) =>
      this.domainProperty.toEntity(video as VideoOrmEntity)
    );
  }
}
