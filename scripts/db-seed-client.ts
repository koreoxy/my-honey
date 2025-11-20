// scripts/db-seed-client.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

export const getSeedDB = () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  client.connect(); // penting
  return drizzle(client);
};
