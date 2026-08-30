import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.js";

// Connection string is provided by Cloud SQL env var via the agent runtime.
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL environment variable is missing. Database connection will fail.");
}

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = connectionString ? postgres(connectionString, { prepare: false }) : null as any;
export const db = client ? drizzle(client, { schema }) : null as any;
