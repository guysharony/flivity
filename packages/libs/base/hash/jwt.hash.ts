import { JwtPayload, sign, SignOptions, verify } from "jsonwebtoken";

export class JWT {
  constructor() {}

  protected sign(
    payload: string | object | Buffer,
    secret: string,
    options?: SignOptions
  ): string {
    return sign(payload, secret, options);
  }

  protected decode(token: string, secret: string): string | JwtPayload | null {
    try {
      return verify(token, secret);
    } catch (err) {
      return null;
    }
  }
}
