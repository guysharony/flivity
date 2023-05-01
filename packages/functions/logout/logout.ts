import { ApiHandler } from "sst/node/api";

export const handler = ApiHandler(async () => {
  return {
    statusCode: 200,
    headers: {
      location: `${process.env.VITE_APPLICATION_URL}`,
    },
    cookies: [
      `session-token=; HttpOnly; SameSite=None; Secure; Path=/; Expires=Thu, 01 Jan 1970 00:00:00`,
    ],
    body: JSON.stringify({}),
  };
});
