import { ApiHandler, useCookie } from "sst/node/api";

import { trpc } from "@packages/functions/trpc/trpc";
import { SessionToken } from "@packages/libs/base/token/session-token";
import { AccessToken } from "@packages/libs/base/token/access-token";

export const handler = ApiHandler(async () => {
  const cookie = useCookie("session-token");

  try {
    if (!cookie) {
      return {
        statusCode: 200,
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({}),
      };
    }

    const sessionToken = new SessionToken(cookie);
    if (!sessionToken.payload) {
      throw new Error("session token not valid.");
    }

    const userID = sessionToken.payload.userID;
    const user = await trpc.user.findById({ id: userID });
    if (!user) {
      throw new Error("user not found.");
    }

    const accessToken = new AccessToken(sessionToken.payload);
    if (!accessToken.maxAge || !accessToken.token) {
      throw new Error("access token not valid.");
    }

    sessionToken.expand();

    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      cookies: [
        `session-token=${sessionToken.token}; HttpOnly; SameSite=None; Secure; Path=/; Expires=${sessionToken.maxAge}`,
      ],
      body: JSON.stringify({
        accessToken: accessToken.token,
        expires: accessToken.maxAge.toUTCString(),
        user: {
          id: user.id,
          email: user.email,
          email_verified: user.hasEmailVerified,
          account_configured: user.hasAccountConfigured,
        },
      }),
    };
  } catch (err) {
    console.log("error session: ", err);
    return {
      statusCode: 403,
      cookies: [
        `session-token=; HttpOnly; SameSite=None; Secure; Path=/; Expires=Thu, 01 Jan 1970 00:00:00`,
      ],
      body: JSON.stringify({}),
    };
  }
});
