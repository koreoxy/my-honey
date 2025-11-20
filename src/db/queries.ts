import { desc, eq } from "drizzle-orm";
import { todos } from "./schema";
import { getDB } from "./db";

export const getTodosByUserId = async (
  env: { DATABASE_URL: string },
  userId: string
) => {
  const db = getDB(env);
  return await db
    .select()
    .from(todos)
    .where(eq(todos.userId, userId))
    .orderBy(desc(todos.createdAt));
};
