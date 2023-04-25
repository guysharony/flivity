import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@packages/functions/trpc/trpc";

export const trpc = createTRPCReact<AppRouter>();
