export interface CreateUploadProps {
  uploadID?: string;
  uploadKey?: string;
  uploadTotal?: number;
  uploadPart?: number;
  fileSize?: number;
  fileType?: string;
}

export interface UpdateUploadProps {
  uploadPart: number;
}
