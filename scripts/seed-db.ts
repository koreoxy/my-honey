import "dotenv/config";
import * as schema from "../src/db/schema";
import { seed } from "drizzle-seed";
import { getSeedDB } from "./db-seed-client";

async function main() {
  try {
    // **PANGGIL fungsi getSeedDB**
    const db = getSeedDB();

    await seed(db, schema).refine((funcs) => ({
      user: {
        columns: {},
        count: 10,
        with: {
          todos: 10,
        },
      },
      todos: {
        columns: {
          title: funcs.valuesFromArray({
            values: [
              "Buy groceries",
              "Walk the dog",
              "Read a book",
              "Write code",
              "Exercise",
              "Call a friend",
              "Plan a trip",
              "Clean the house",
              "Cook dinner",
              "Watch a movie",
            ],
          }),
          description: funcs.valuesFromArray({
            values: [
              "Get milk, eggs, and bread",
              "Take Fido for a walk in the park",
              "Finish reading the novel",
              "Work on the new project",
              "Go for a run or hit the gym",
              "Catch up with an old friend",
              "Research destinations and book flights",
              "Tidy up the living room and kitchen",
              "Prepare a healthy meal",
              "Watch the latest blockbuster",
            ],
          }),
        },
      },
    }));

    console.log("✔ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Failed to seed database:");
    console.error(error);
    process.exit(1);
  }
}

main();
