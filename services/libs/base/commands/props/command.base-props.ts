import { Command } from "../command.base";

export type CommandProps<T> = Omit<T, "id"> & Partial<Command>;
