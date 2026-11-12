import { config } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
config({ path: ".env.local", quiet: true });
config({ quiet: true });
if (!process.env.PRISMA_DATABASE_URL)
  throw new Error("PRISMA_DATABASE_URL is required to seed.");
const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.PRISMA_DATABASE_URL, max: 1 }),
});
try {
  await db.category.createMany({
    data: [
      "Technology",
      "Travel",
      "Food",
      "Lifestyle",
      "Business",
      "Health",
      "Education",
      "Entertainment",
    ].map((name) => ({ name, creator_id: null })),
    skipDuplicates: true,
  });
} finally {
  await db.$disconnect();
}
