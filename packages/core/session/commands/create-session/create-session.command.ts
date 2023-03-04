import {
  Command,
  CommandProps,
} from "@services/libs/base/commands/command.base";

export class CreateSessionCommand extends Command {
  constructor(props: CommandProps<CreateSessionCommand>) {
    super(props);
    this.userId = props.userId;
    this.email = props.email;
    this.token = props.token;
  }

  readonly userId: string;
  readonly email: string;
  readonly token: string;
}
