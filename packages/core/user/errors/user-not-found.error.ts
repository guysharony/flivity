import { ExceptionBase } from "@packages/libs/base/exceptions/exception.base";

export class UserNotFoundError extends ExceptionBase {
  public readonly code = "USER.NOT_FOUND";
  static readonly message = "User not found.";

  constructor() {
    super(UserNotFoundError.message);
  }
}
