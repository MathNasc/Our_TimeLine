import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.js";

const connectionString = process.env.DATABASE_URL;

let client: any = null;
let db: any = null;

if (connectionString) {
  try {
    client = postgres(connectionString, { prepare: false });
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
    `.catch((err: any) => console.warn("[AI Studio] Database auto-migrate create warning:", err?.message || err));

    client`ALTER TABLE retrospectives ENABLE ROW LEVEL SECURITY;`
      .catch((err: any) => console.warn("[AI Studio] Database auto-migrate RLS warning:", err?.message || err));

    db = drizzle(client, { schema });
  } catch (err: any) {
    console.warn("[AI Studio] Database connection could not be established. Using in-memory/file storage fallback:", err?.message || err);
    client = null;
    db = null;
  }
} else {
  console.log("[AI Studio] DATABASE_URL not set — using local file/memory storage for retrospectives.");
}

export { db };
