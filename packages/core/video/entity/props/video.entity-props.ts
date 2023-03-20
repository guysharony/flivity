import { VideoStatus } from "@packages/core/video/enum/status.enum";

export interface CreateVideoProps {
  authorID: string;
  title: string;
  description?: string;
  uploadID?: string;
}

export interface UpdateVideoProps {
  uploadID?: string;
  title?: string;
  description?: string;
  status?: VideoStatus;
}
