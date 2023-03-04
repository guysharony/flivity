import KSUID from "ksuid";
import { CommandProps } from "./props/command.base-props";

export { CommandProps };

export class Command<T = unknown> {
  public readonly id: string;

  constructor(props: CommandProps<T>) {
    this.id = props.id ?? KSUID.randomSync().string;
  }
}
