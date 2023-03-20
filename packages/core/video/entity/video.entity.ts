import KSUID from "ksuid";
import * as path from "path";
import { removeUndefined } from "../../../libs/filter";
import { EntityBase } from "../../../libs/base/classes/entity.base";
import { CreateVideoProps, UpdateVideoProps } from "./props/video.entity-props";
import { VideoRepository } from "../database/video.repository";
import { CreateMultipartUploadCommand, S3Client } from "@aws-sdk/client-s3";

const videoBucket = process.env.BUCKET_VIDEO_NAME as string;

const s3 = new S3Client({ region: "eu-west-1" });

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

  get uploadID() {
    return this.props.uploadID;
  }

  static async create(create: CreateVideoProps) {
    const repository = new VideoRepository();

    const props: VideoProps = {
      title: create.title,
      authorID: create.authorID,
    };

    // Creating video entity
    const video = await repository.save(
      new VideoEntity({
        id: KSUID.randomSync().string,
        props: props,
      })
    );

    // Creating multipart upload
    const key = path.join(video.authorID, video.id);

    const multipartUploadCommand = new CreateMultipartUploadCommand({
      Bucket: videoBucket,
      Key: key,
    });

    const response = await s3.send(multipartUploadCommand);

    await video.update({
      uploadID: response.UploadId!,
    });

    return video;
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
