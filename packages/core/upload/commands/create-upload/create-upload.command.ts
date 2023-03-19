import {
  Command,
  CommandProps,
} from "@packages/libs/base/commands/command.base";

export class CreateUploadCommand extends Command {
  constructor(props: CommandProps<CreateUploadCommand>) {
    super(props);
    this.uploadID = props.uploadID;
    this.uploadKey = props.uploadKey;
    this.uploadTotal = props.uploadTotal;
    this.fileSize = props.fileSize;
    this.fileType = props.fileType;
  }

  readonly uploadID: string;
  readonly uploadKey: string;
  readonly uploadTotal: number;
  readonly fileSize: number;
  readonly fileType: string;
}
