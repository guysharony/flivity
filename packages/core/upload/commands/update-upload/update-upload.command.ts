import {
  Command,
  CommandProps,
} from "@packages/libs/base/commands/command.base";

export class UpdateUploadCommand extends Command {
  constructor(props: CommandProps<UpdateUploadCommand>) {
    super(props);
    this.uploadID = props.uploadID;
    this.uploadPart = props.uploadPart;
  }

  readonly uploadID: string;
  readonly uploadPart: number;
}
