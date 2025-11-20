import { Hono } from "hono";
import { getTodosByUserId } from "../db/queries";
import { authMiddleware } from "../middlewares/auth.middleware";
import { Bindings } from "../types";

export const todos = new Hono<{ Bindings: Bindings }>();
todos.use(authMiddleware);
todos.get("/", async (c) => {
  const user = c.get("user");
  try {
    const todos = await getTodosByUserId(c.env, user.id);
    return c.json(todos);
  } catch (error) {
    console.error("Failed to fetch todos : ", error);
    return c.json({ error: "Failed to fetch todos" }, 500);
  }
});
