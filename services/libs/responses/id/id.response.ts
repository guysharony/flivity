import { IDResponseProps } from "./props/id.response-props";

export class IDResponse implements IDResponseProps {
  constructor(id: string) {
    this.id = id;
  }

  readonly id: string;
}
