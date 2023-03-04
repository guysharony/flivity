import { ExceptionBase } from "@packages/libs/base/exceptions/exception.base";

export class UserAlreadyExistsError extends ExceptionBase {
  public readonly code = "USER.ALREADY_EXISTS";
  static readonly message = "User already exists.";

  constructor() {
    super(UserAlreadyExistsError.message);
  }
}
