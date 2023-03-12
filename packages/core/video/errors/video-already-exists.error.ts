import { ExceptionBase } from "@packages/libs/base/exceptions/exception.base";

export class VideoAlreadyExistsError extends ExceptionBase {
  public readonly code = "VIDEO.ALREADY_EXISTS";
  static readonly message = "Video already exists.";

  constructor() {
    super(VideoAlreadyExistsError.message);
  }
}
