import KSUID from "ksuid";
import { removeUndefined } from "../../../libs/filter";
import { EntityBase } from "../../../libs/base/classes/entity.base";
import { CreateVideoProps, UpdateVideoProps } from "./props/video.entity-props";
import { VideoRepository } from "../database/video.repository";

export interface VideoProps extends CreateVideoProps {}

export class VideoEntity extends EntityBase<VideoProps> {
  protected declare readonly _id: string;

  repository = new VideoRepository();

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get authorID() {
    return this.props.authorID;
  }

  static async create(create: CreateVideoProps) {
    const repository = new VideoRepository();

    const props: VideoProps = {
      authorID: create.authorID,
    };

    const user = new VideoEntity({
      id: KSUID.randomSync().string,
      props: props,
    });

    return await repository.save(user);
  }

  async update(update: UpdateVideoProps) {
    const filtered = removeUndefined(update);

    this.props = {
      ...this.props,
      ...filtered,
    };

    return await this.repository.update(this.id, this);
  }

  async delete() {
    return await this.repository.delete(this);
  }
}
