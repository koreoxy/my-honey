import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

export interface Env {
  DATABASE_URL: string;
}

let _db: ReturnType<typeof drizzle> | null = null;

export const getDB = (env: Env) => {
  if (_db) return _db;

  const sql = neon(env.DATABASE_URL);
  _db = drizzle(sql);

  return _db;
};
