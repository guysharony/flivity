import { ApiHandler, useCookie } from "sst/node/api";
import { Config } from "sst/node/config";

import { JWT } from "@packages/libs/base/hash/jwt.hash";
import { trpc } from "@packages/functions/trpc/trpc";

export const handler = ApiHandler(async () => {
  const sessionToken = useCookie("session-token");

  try {
    if (!sessionToken) {
      return {
        statusCode: 200,
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({}),
      };
    }

    const payload = JWT.decode(sessionToken, Config.FLIVITY_KEY);

    if (!payload || typeof payload == "string") {
      throw new Error("session token not valid.");
    }

    const userID = payload.userID;
    const user = await trpc.user.findById({ id: userID });
    if (!user) {
      throw new Error("user not found.");
    }

    const issued = Date.now();
    const expires = 7 * 24 * 60 * 60 * 1000;
    const maxAge = new Date(issued + expires);

    const accessToken = JWT.sign(
      {
        user_id: user.id,
        iat: issued,
        exp: issued + expires,
      },
      Config.FLIVITY_KEY
    );

    return {
      statusCode: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        accessToken: accessToken,
        expires: maxAge.toUTCString(),
        user: {
          id: user.id,
          email: user.email,
          username: user.username!,
          profile_picture: user.profilePicture,
          email_verified: user.hasEmailVerified,
          account_configured: user.hasAccountConfigured,
        },
      }),
    };
  } catch (err) {
    return {
      statusCode: 403,
      cookies: [
        `session-token=; HttpOnly; SameSite=None; Secure; Path=/; Expires=Thu, 01 Jan 1970 00:00:00`,
      ],
      body: JSON.stringify({}),
    };
  }
});
