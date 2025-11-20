import { auth } from "./lib/auth";

declare module "hono" {
  interface ContextVariableMap {
    user: ReturnType<typeof auth>["$Infer"]["Session"]["user"];
    session: ReturnType<typeof auth>["$Infer"]["Session"];
  }
}
