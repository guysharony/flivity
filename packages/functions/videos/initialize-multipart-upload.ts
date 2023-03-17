import { ApiHandler } from "sst/node/api";

export const handler = ApiHandler(async (event) => {
  console.log(event.body);

  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({}),
  };
});
