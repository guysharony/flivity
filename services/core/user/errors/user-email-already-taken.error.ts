import { ExceptionBase } from "@services/libs/base/exceptions/exception.base";

export class UserEmailAddressAlreadyTaken extends ExceptionBase {
  public readonly code = "USER.EMAIL_ALREADY_TAKEN";
  static readonly message = "Email address already taken.";

  constructor() {
    super(UserEmailAddressAlreadyTaken.message);
  }
}
