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

if (client) {
  // Auto-create table to prevent 500 errors if user didn't run drizzle-kit push
  client`
    CREATE TABLE IF NOT EXISTS retrospectives (
      id TEXT PRIMARY KEY,
      owner_id TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'draft',
      title TEXT,
      couple_name TEXT,
      person_1 TEXT,
      person_2 TEXT,
      relationship_date TEXT,
      cover_image TEXT,
      data JSONB,
      theme JSONB,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      published_at TIMESTAMP
    );
  `.catch((err: any) => console.error("Auto-migrate error:", err));
}

export const db = client ? drizzle(client, { schema }) : null as any;
