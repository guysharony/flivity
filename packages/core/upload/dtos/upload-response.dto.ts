import { UploadEntity } from "../entity/upload.entity";

export class UploadResponse {
  constructor(upload: UploadEntity) {
    this.id = upload.id;
    this.uploadID = upload.uploadID;
    this.uploadKey = upload.uploadKey;
    this.uploadTotal = upload.uploadTotal;
    this.fileSize = upload.fileSize;
    this.fileType = upload.fileType;
  }

  id: string;
  uploadID?: string;
  uploadKey?: string;
  uploadTotal?: number;
  fileSize?: number;
  fileType?: string;
}
