import {
  Command,
  CommandProps,
} from "@packages/libs/base/commands/command.base";

export class SetupUserCommand extends Command {
  constructor(props: CommandProps<SetupUserCommand>) {
    super(props);
    this.firstName = props.firstName;
    this.lastName = props.lastName;
  }

  readonly firstName: string;
  readonly lastName: string;
}
