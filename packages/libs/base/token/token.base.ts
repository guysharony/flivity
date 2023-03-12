import { Config } from "sst/node/config";

import { JWT } from "../hash/jwt.hash";

export type ITokenBase = string;

export interface ITokenBasePayload {
  userID: string;
}

export default class TokenBase extends JWT {
  private _maxAge?: Date;
  private _expiresIn?: number;
  private _token?: string;
  private _payload?: ITokenBasePayload;

  constructor(
    value: ITokenBasePayload | ITokenBase | undefined,
    private duration: number
  ) {
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

  // TokenBase
  public get token() {
    return this._token;
  }

  // TokenBase payload
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

  public set payload(value: ITokenBasePayload | undefined) {
    this._payload = value;
  }

  public set maxAge(value: Date | undefined) {
    this._maxAge = value;
  }

  private create(value: ITokenBasePayload) {
    this.payload = value;
    this.expiresIn = this.duration;

    this.token = this.sign(value, Config.FLIVITY_KEY, {
      expiresIn: this.expiresIn,
    });

    return this.token;
  }

  private check(token: ITokenBase) {
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

      return { userID: payload.userID } as ITokenBasePayload;
    } catch (err) {
      return null;
    }
  }

  expand() {
    if (!this.payload) {
      throw new Error("Failed to expand");
    }

    return this.create(this.payload);
  }
}
