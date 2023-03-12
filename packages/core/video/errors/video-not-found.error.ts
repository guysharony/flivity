import { ExceptionBase } from "@packages/libs/base/exceptions/exception.base";

export class VideoNotFoundError extends ExceptionBase {
  public readonly code = "VIDEO.NOT_FOUND";
  static readonly message = "Video not found.";

  constructor() {
    super(VideoNotFoundError.message);
  }
}
