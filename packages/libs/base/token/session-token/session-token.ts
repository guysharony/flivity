import { Config } from "sst/node/config";

import { JWT } from "../../hash/jwt.hash";

import { ISessionToken, ISessionTokenPayload } from "./session-token.interface";

export class SessionToken extends JWT {
  private _maxAge?: Date;
  private _expiresIn?: number;
  private _token?: string;
  private _payload?: ISessionTokenPayload;

  constructor(value?: ISessionTokenPayload | ISessionToken) {
    super();

    switch (typeof value) {
      case "string":
        this.check(value);
        break;
      case "object":
        this.create(value);
        break;
      default:
        break;
    }
  }

  // Duration lifetime in seconds
  public get expiresIn() {
    return this._expiresIn;
  }

  // Expiration date
  public get maxAge() {
    return this._maxAge;
  }

  // Token
  public get token() {
    return this._token;
  }

  // Token payload
  public get payload() {
    return this._payload;
  }

  public get isValid() {
    return this.expiresIn && this.maxAge && this.token && this.payload;
  }

  // Duration lifetime in seconds
  public set expiresIn(value: number | undefined) {
    this._expiresIn = value || 0;
    this._maxAge = new Date(Date.now() + this._expiresIn * 1000);
  }

  public set token(value: string | undefined) {
    this._token = value;
  }

  public set payload(value: ISessionTokenPayload | undefined) {
    this._payload = value;
  }

  public set maxAge(value: Date | undefined) {
    this._maxAge = value;
  }

  private create(value: ISessionTokenPayload) {
    this.payload = value;
    this.expiresIn = 5 * 60;

    this.token = this.sign(value, Config.FLIVITY_KEY, {
      expiresIn: this.expiresIn,
    });

    return this.token;
  }

  private check(token: ISessionToken) {
    if (!token) {
      return null;
    }

    try {
      const payload = this.decode(token, Config.FLIVITY_KEY);
      if (
        !payload ||
        typeof payload == "string" ||
        !payload.exp ||
        !payload.iat
      ) {
        throw new Error("session token not valid.");
      }

      this.payload = { userID: payload.userID };
      this._expiresIn = payload.iat - payload.exp;
      this._maxAge = new Date(payload.exp * 1000);

      return { userID: payload.userID } as ISessionTokenPayload;
    } catch (err) {
      return null;
    }
  }
}
