import { VideoOrmEntity } from "./video.orm.entity";
import { VideoEntity } from "../entity/video.entity";

import {
  OrmEntityProps,
  OrmPropertyBase,
} from "../../../libs/base/classes/orm.property.base";

export class VideoOrmProperty extends OrmPropertyBase<
  VideoEntity,
  VideoOrmEntity
> {
  toCreate(entity: VideoEntity): OrmEntityProps<VideoOrmEntity> {
    const props = entity.props;

    const ormProps = {
      title: props.title,
      description: props.description,
      authorID: props.authorID,
    };

    return ormProps;
  }

  toUpdate(entity: VideoEntity): DeepPartial<VideoOrmEntity> {
    const props = entity.props;

    const ormProps = {
      title: props.title,
      description: props.description,
      authorID: props.authorID,
    };

    return ormProps;
  }
}
