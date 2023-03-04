import { BooleanResponseProps } from "./props/boolean.response-props";

export class BooleanResponse implements BooleanResponseProps {
  constructor(result: boolean) {
    this.result = result;
  }

  readonly result: boolean;
}
