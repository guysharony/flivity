import { JwtPayload, sign, SignOptions, verify } from "jsonwebtoken";

export class JWT {
  static sign(
    payload: string | object | Buffer,
    secret: string,
    options?: SignOptions
  ): string {
    return sign(payload, secret, options);
  }

  static decode(token: string, secret: string): string | JwtPayload | null {
    try {
      console.log("VERIFY: ", token, secret);
      return verify(token, secret);
    } catch (err) {
      console.log("verify: ", err);
      return null;
    }
  }
}
