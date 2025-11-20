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

// Kita akan menyimpan instance auth di sini
let authInstance: ReturnType<typeof betterAuth> | null = null;

// Fungsi init (dipanggil sekali)
export const initAuth = (env: Env) => {
  if (authInstance) return authInstance;

  const sql = neon(env.DATABASE_URL);
  const db = drizzle(sql, { schema });

  authInstance = betterAuth({
    runtime: "cf",
    database: drizzleAdapter(db, {
      provider: "pg",
      schema,
    }),
    emailAndPassword: {
      enabled: true,
    },
    trustedOrigins: [env.CLIENT_URL],
    plugins: [openAPI()],
  });

  return authInstance;
};

// Export instance auth untuk seluruh aplikasi
export const auth = () => authInstance!;
