import { ExceptionBase } from "@packages/libs/base/exceptions/exception.base";

export class UploadNotFoundError extends ExceptionBase {
  public readonly code = "UPLOAD.NOT_FOUND";
  static readonly message = "Upload not found.";

  constructor() {
    super(UploadNotFoundError.message);
  }
}
