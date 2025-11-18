import { Hono } from "hono";
import { createAuth } from "./lib/auth";
import { getTodos } from "./db/queries";

type Bindings = {
  DATABASE_URL: string;
  CLIENT_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Instance auth per-request sesuai dokumentasi baru
const getAuth = (c: any) =>
  createAuth({
    DATABASE_URL: c.env.DATABASE_URL,
    CLIENT_URL: c.env.CLIENT_URL,
  });

// Auth route (built-in)
app.on(["GET", "POST"], "/api/auth/*", (c) => {
  const auth = getAuth(c);
  return auth.handler(c.req.raw);
});

// Test endpoint
app.get("/api/todos", async (c) => {
  try {
    const todos = await getTodos(c.env);
    return c.json(todos);
  } catch (error) {
    console.error("Failed to fetch todos : ", error);
    return c.json({ error: "Failed to fetch todos" }, 500);
  }
});

export default app;
