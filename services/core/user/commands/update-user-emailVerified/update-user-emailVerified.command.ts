import {
  Command,
  CommandProps,
} from "@services/libs/base/commands/command.base";

export class UpdateUserEmailVerifiedCommand extends Command {
  constructor(props: UpdateUserEmailVerifiedCommand) {
    super(props);
    this.id = props.id;
    this.hasEmailVerified = props.hasEmailVerified;
  }

  readonly id: string;
  readonly hasEmailVerified: boolean;
}
