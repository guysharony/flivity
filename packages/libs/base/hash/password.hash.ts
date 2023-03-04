import bcrypt from "bcryptjs";

export class Password {
  static hash(password: string): string {
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }

  static compare(data: string, encrypted: string): boolean {
    const is_password_match = bcrypt.compareSync(data, encrypted);

    return is_password_match;
  }
}
