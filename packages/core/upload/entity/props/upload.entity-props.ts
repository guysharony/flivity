export interface CreateUploadProps {
  id: string;
  uploadKey: string;
  uploadPart?: number;
  fileSize: number;
  fileType: string;
}

export interface UpdateUploadProps {
  uploadPart: number;
}
