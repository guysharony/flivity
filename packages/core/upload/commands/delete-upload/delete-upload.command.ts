import {
  Command,
  CommandProps,
} from "@packages/libs/base/commands/command.base";

export class DeleteUploadCommand extends Command {
  constructor(props: CommandProps<DeleteUploadCommand>) {
    super(props);
    this.uploadID = props.uploadID;
  }

  readonly uploadID: string;
}
