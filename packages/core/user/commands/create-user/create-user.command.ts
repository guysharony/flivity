import {
  Command,
  CommandProps,
} from "@packages/libs/base/commands/command.base";

export class CreateUserCommand extends Command {
  constructor(props: CommandProps<CreateUserCommand>) {
    super(props);
    this.email = props.email;
  }

  readonly email: string;
}
