import { createMiddleware } from "hono/factory";
import { initAuth } from "../lib/auth";

export const authMiddleware = createMiddleware(async (c, next) => {
  // Ambil ENV dari Cloudflare Worker / Hono
  const env = c.env;

  // Buat auth instance
  const auth = initAuth(env);

  // Ambil session dari Better Auth
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  // Simpan user & session di context
  c.set("user", session.user);
  c.set("session", session);

  return next();
});
