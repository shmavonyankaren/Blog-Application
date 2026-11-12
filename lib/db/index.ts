import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/lib/generated/prisma/client";
const globalDb = globalThis as unknown as { prisma?: PrismaClient };
function getClient() {
  if (globalDb.prisma) return globalDb.prisma;
  const connectionString = process.env.DATABASE_URL_POOLED;
  if (!connectionString)
    throw new Error(
      "DATABASE_URL_POOLED is required for application database access.",
    );
  globalDb.prisma = new PrismaClient({
    adapter: new PrismaPg({
      connectionString,
      max: 3,
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 10000,
    }),
  });
  return globalDb.prisma;
}
// Initialize on first operation, not during build/module evaluation.
const db = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const client = getClient();
    const value = Reflect.get(client, property);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
export default db;
