import {
  Command,
  CommandProps,
} from "@services/libs/base/commands/command.base";

export class CreateUserCommand extends Command {
  constructor(props: CommandProps<CreateUserCommand>) {
    super(props);
    this.email = props.email;
  }

  readonly email: string;
}
