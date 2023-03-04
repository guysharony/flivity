import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@packages/functions/trpc";

export const trpc = createTRPCReact<AppRouter>();
