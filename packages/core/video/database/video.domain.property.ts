import { VideoOrmEntity } from "./video.orm.entity";
import { VideoEntity, VideoProps } from "../entity/video.entity";

import { DomainPropertyBase } from "../../../libs/base/classes/domain.property.base";
import { CreateEntityProps } from "../../../libs/base/classes/entity.base";

export class VideoDomainProperty extends DomainPropertyBase<
  VideoEntity,
  VideoOrmEntity
> {
  toDomain(ormEntity: VideoOrmEntity): CreateEntityProps<VideoProps> {
    const props: VideoProps = {
      title: ormEntity.title,
      description: ormEntity.description,
      authorID: ormEntity.authorID,
    };

    return { id: ormEntity.id, props };
  }
}
