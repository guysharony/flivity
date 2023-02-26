import { JwtPayload, sign, verify } from "jsonwebtoken";

export class JWT {
  static sign(payload: string | object | Buffer, secret: string): string {
    return sign(payload, secret);
  }

  static decode(token: string, secret: string): string | JwtPayload | null {
    try {
      return verify(token, secret);
    } catch (err) {
      return null;
    }
  }
}
