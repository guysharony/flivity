import { Result } from "oxide.ts";
import { Command } from "./command.base";

export abstract class CommandService<
  CommandServiceReturn = unknown,
  CommandServiceError extends Error = Error
> {
  abstract handler(
    command: Command
  ): Promise<Result<CommandServiceReturn, CommandServiceError>>;

  execute(command: Command) {
    return this.handler(command);
  }
}
