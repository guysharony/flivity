import {
  Command,
  CommandProps,
} from "@packages/libs/base/commands/command.base";

export class SetupUserCommand extends Command {
  constructor(props: CommandProps<SetupUserCommand>) {
    super(props);
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.username = props.username;
    this.displayName = props.displayName;
  }

  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly displayName: string;
}
