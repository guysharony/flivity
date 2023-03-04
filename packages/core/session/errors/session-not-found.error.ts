import { ExceptionBase } from "@packages/libs/base/exceptions/exception.base";

export class SessionNotFoundError extends ExceptionBase {
  public readonly code = "SESSION.NOT_FOUND";
  static readonly message = "Session not found.";

  constructor() {
    super(SessionNotFoundError.message);
  }
}
