import TokenBase, { ITokenBase, ITokenBasePayload } from "./token.base";

export class AccessToken extends TokenBase {
  constructor(value: ITokenBasePayload | ITokenBase) {
    super(value, 90 * 24 * 60 * 60);
  }
}
