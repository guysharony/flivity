import { ApiHandler } from "sst/node/api";
import { Config } from "sst/node/config";
import { AuthHandler, LinkAdapter } from "sst/node/auth";

import { JWT } from "@packages/libs/base/hash/jwt.hash";
import { SESClient } from "@packages/libs/client/ses.client";

import { trpc } from "@packages/functions/trpc/trpc";

declare module "sst/node/auth" {
  export interface SessionTypes {
    user: {
      userID: string;
    };
  }
}

const ses = new SESClient();

export const handler = ApiHandler(async (event, context) => {
  return AuthHandler({
    providers: {
      link: LinkAdapter({
        onLink: async function (link, claims) {
          console.log("Link: ", link, claims);

          const url = new URL(link);
          const params = new URLSearchParams(url.search);
          const token = params.get("token");
          if (!token) {
            throw new Error("Token is not valid.");
          }

          const user = await trpc.user.findByEmail({ email: claims.email });
          if (!user) {
            throw new Error("User not found.");
          }

          await trpc.session.create({
            userId: user.id,
            email: user.email,
            token: token,
          });

          //await ses.confirmEmail(claims.email, link);

          return {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: "Please check your inbox.",
            }),
          };
        },
        onSuccess: async function (claims) {
          const parameters: any = event.queryStringParameters;

          if (!parameters?.token) {
            throw new Error("Token is not valid.");
          }

          const token: string = parameters.token;

          const session = await trpc.session.findByToken({
            email: claims.email,
            token: token,
          });
          if (!session) {
            throw new Error("Token is not valid.");
          }

          await trpc.session.delete({ email: session.email, token: token });

          await trpc.user.updateEmailVerified({
            id: session.userId,
            hasEmailVerified: true,
          });

          const issued = Date.now();
          const expires = 30 * 24 * 60 * 60 * 1000;
          const maxAge = new Date(issued + expires);

          const sessionToken = JWT.sign(
            {
              userID: session.userId,
              iat: issued,
              exp: issued + expires,
            },
            Config.FLIVITY_KEY
          );

          return {
            statusCode: 302,
            headers: {
              location: `${process.env.REACT_APP_URL}`,
            },
            cookies: [
              `session-token=${sessionToken}; HttpOnly; SameSite=None; Secure; Path=/; Expires=${maxAge}`,
            ],
          };
        },
        onError: async () => {
          return {
            statusCode: 200,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: "Oops, something went wrong!" }),
          };
        },
      }),
    },
  })(event, context);
});
