import { ApiHandler } from "sst/node/api";

export const handler = ApiHandler(async (event) => {
  console.log(event);

  return {};
});
