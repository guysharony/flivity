import { ExceptionBase } from "@packages/libs/base/exceptions/exception.base";

export class SessionAlreadyExistsError extends ExceptionBase {
  public readonly code = "SESSION.ALREADY_EXISTS";
  static readonly message = "Session already exists.";

  constructor() {
    super(SessionAlreadyExistsError.message);
  }
}
