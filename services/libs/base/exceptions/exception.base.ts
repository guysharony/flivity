export abstract class ExceptionBase extends Error {
  abstract code: string;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ExceptionBase.prototype);
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
