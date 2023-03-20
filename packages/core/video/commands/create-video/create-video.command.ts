import {
  Command,
  CommandProps,
} from "@packages/libs/base/commands/command.base";

export class CreateVideoCommand extends Command {
  constructor(props: CommandProps<CreateVideoCommand>) {
    super(props);
    this.authorID = props.authorID;
    this.filename = props.filename;
    this.filesize = props.filesize;
    this.filetype = props.filetype;
  }

  readonly authorID: string;
  readonly filename: string;
  readonly filesize: string;
  readonly filetype: string;
}
