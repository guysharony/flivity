import { Query } from "../query.base";

export type QueryProps<T> = Omit<T, "id"> & Partial<Query>;
