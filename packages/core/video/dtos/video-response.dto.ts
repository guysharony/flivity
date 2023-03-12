import { VideoEntity } from "../entity/video.entity";

export class VideoResponse {
  constructor(video: VideoEntity) {
    this.id = video.id;
    this.title = video.title;
    this.description = video.description;
    this.authorID = video.authorID;
  }

  id: string;
  title?: string;
  description?: string;
  authorID?: string;
}
