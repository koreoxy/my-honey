import "dotenv/config";
import { db } from "../src/db/db";
import * as schema from "../src/db/schema";
import { seed } from "drizzle-seed";

async function main() {
  try {
    await seed(db, schema);

    console.log("✔ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Failed to seed database:");
    console.error(error);
    process.exit(1);
  }
}

main();
