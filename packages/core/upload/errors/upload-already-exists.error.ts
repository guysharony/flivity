import { ExceptionBase } from "@packages/libs/base/exceptions/exception.base";

export class UploadAlreadyExistsError extends ExceptionBase {
  public readonly code = "UPLOAD.ALREADY_EXISTS";
  static readonly message = "Upload already exists.";

  constructor() {
    super(UploadAlreadyExistsError.message);
  }
}
