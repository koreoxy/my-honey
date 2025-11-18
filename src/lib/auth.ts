import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";
import { openAPI } from "better-auth/plugins";

export interface Env {
  DATABASE_URL: string;
  CLIENT_URL: string;
}

export const createAuth = (env: Env) => {
  // Neon Serverless HTTP driver
  const sql = neon(env.DATABASE_URL);

  // Drizzle instance
  const db = drizzle(sql, { schema });

  // Better Auth instance
  return betterAuth({
    runtime: "cf", // wajib untuk Cloudflare Worker

    database: drizzleAdapter(db, {
      provider: "pg",
      schema,
    }),

    emailAndPassword: {
      enabled: true,
    },

    // gunakan env cloudflare, bukan process.env
    trustedOrigins: [env.CLIENT_URL],
    plugins: [openAPI()],
  });
};
