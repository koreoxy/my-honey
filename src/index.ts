import { Hono } from "hono";
import { auth, initAuth } from "./lib/auth";
import { todos } from "./routes/todo.routes";
import { Bindings } from "./types";
import { hc } from "hono/client";

const app = new Hono<{ Bindings: Bindings }>();

// Init auth sekali di startup / per request env
app.use("*", async (c, next) => {
  initAuth({
    DATABASE_URL: c.env.DATABASE_URL,
    CLIENT_URL: c.env.CLIENT_URL,
  });
  await next();
});

// Auth route (built-in)
app.on(["GET", "POST"], "/api/auth/*", (c) => {
  return auth().handler(c.req.raw);
});

app.route("/api/todos", todos);

export type AppType = typeof app;
export const client = hc<AppType>("/");

export default app;
