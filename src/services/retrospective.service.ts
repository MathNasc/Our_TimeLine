import { eq, desc } from "drizzle-orm";
import { db } from "../db/index.js";
import { retrospectives } from "../db/schema.js";
import fs from "fs";
import path from "path";

const DB_FILE = process.env.VERCEL
  ? "/tmp/published_retros.json"
  : path.join(process.cwd(), "published_retros.json");

function getLocalStore(): Record<string, any> {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
    }
  } catch (e: any) {
    console.warn("[AI Studio] Failed to read local retro store:", e?.message);
  }
  return {};
}

function saveLocalStore(store: Record<string, any>): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (e: any) {
    console.warn("[AI Studio] Failed to write local retro store:", e?.message);
  }
}

export class RetrospectiveService {
  async getBySlug(slug: string) {
    if (db) {
      try {
        const result = await db.select().from(retrospectives).where(eq(retrospectives.slug, slug)).limit(1);
        if (result && result.length > 0) return result[0];
      } catch (err: any) {
        console.warn("[AI Studio] DB getBySlug failed, falling back to local store:", err?.message);
      }
    }
    const store = getLocalStore();
    return store[slug] || Object.values(store).find((r: any) => r.slug === slug) || null;
  }

  async getByOwner(owner_id: string) {
    if (db) {
      try {
        return await db.select().from(retrospectives).where(eq(retrospectives.owner_id, owner_id)).orderBy(desc(retrospectives.updated_at));
      } catch (err: any) {
        console.warn("[AI Studio] DB getByOwner failed, falling back to local store:", err?.message);
      }
    }
    const store = getLocalStore();
    const list = Object.values(store);
    return list.filter((r: any) => !r.owner_id || r.owner_id === owner_id || owner_id === "local-user");
  }

  async getById(id: string) {
    if (db) {
      try {
        const result = await db.select().from(retrospectives).where(eq(retrospectives.id, id)).limit(1);
        if (result && result.length > 0) return result[0];
      } catch (err: any) {
        console.warn("[AI Studio] DB getById failed, falling back to local store:", err?.message);
      }
    }
    const store = getLocalStore();
    return Object.values(store).find((r: any) => r.id === id) || null;
  }

  async create(data: any) {
    const record = {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    };
    if (db) {
      try {
        const result = await db.insert(retrospectives).values(record).returning();
        if (result && result.length > 0) {
          const store = getLocalStore();
          store[data.slug || data.id] = result[0];
          saveLocalStore(store);
          return result[0];
        }
      } catch (err: any) {
        console.warn("[AI Studio] DB insert failed, falling back to local store:", err?.message);
      }
    }
    const store = getLocalStore();
    const key = data.slug || data.id;
    store[key] = record;
    saveLocalStore(store);
    return record;
  }

  async update(id: string, data: any) {
    const updatedRecord = { ...data, updated_at: new Date() };
    if (db) {
      try {
        const result = await db
          .update(retrospectives)
          .set(updatedRecord)
          .where(eq(retrospectives.id, id))
          .returning();
        if (result && result.length > 0) {
          const store = getLocalStore();
          const key = data.slug || id;
          store[key] = result[0];
          saveLocalStore(store);
          return result[0];
        }
      } catch (err: any) {
        console.warn("[AI Studio] DB update failed, falling back to local store:", err?.message);
      }
    }
    const store = getLocalStore();
    const existingKey = Object.keys(store).find(k => store[k]?.id === id) || data.slug || id;
    store[existingKey] = { ...store[existingKey], ...updatedRecord };
    saveLocalStore(store);
    return store[existingKey];
  }

  async publish(id: string) {
    return this.update(id, { status: "published", published_at: new Date() });
  }

  async unpublish(id: string) {
    return this.update(id, { status: "draft" });
  }

  async delete(id: string) {
    if (db) {
      try {
        await db.delete(retrospectives).where(eq(retrospectives.id, id));
      } catch (err: any) {
        console.warn("[AI Studio] DB delete failed, falling back to local store:", err?.message);
      }
    }
    const store = getLocalStore();
    const key = Object.keys(store).find(k => store[k]?.id === id);
    if (key) {
      delete store[key];
      saveLocalStore(store);
    }
    return { success: true };
  }
}

export const retrospectiveService = new RetrospectiveService();
