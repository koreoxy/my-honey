import { desc } from "drizzle-orm";
import { todos } from "./schema";
import { getDB } from "./db";

export const getTodos = async (env: { DATABASE_URL: string }) => {
  const db = getDB(env);
  return await db.select().from(todos).orderBy(desc(todos.createdAt));
};
