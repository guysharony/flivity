import { ExceptionBase } from "@services/libs/base/exceptions/exception.base";

export class UserUsernameAlreadyTaken extends ExceptionBase {
  public readonly code = "USER.USERNAME_ALREADY_TAKEN";
  static readonly message = "Username already taken.";

  constructor() {
    super(UserUsernameAlreadyTaken.message);
  }
}
