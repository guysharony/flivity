import { Auth, StackContext, use } from "sst/constructs";
import { ApiStack } from "./ApiStack";

export function AuthStack({ stack }: StackContext) {
  const api = use(ApiStack);

  const auth = new Auth(stack, "auth", {
    authenticator: {
      handler: "packages/functions/auth/auth.handler",
    },
  });

  auth.attach(stack, {
    api,
    prefix: "/auth",
  });

  return auth;
}
