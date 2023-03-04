import {
  Command,
  CommandProps,
} from "@services/libs/base/commands/command.base";

export class DeleteSessionCommand extends Command {
  constructor(props: CommandProps<DeleteSessionCommand>) {
    super(props);
    this.email = props.email;
    this.token = props.token;
  }

  readonly email: string;
  readonly token: string;
}
