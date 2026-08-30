import { eq, desc } from "drizzle-orm";
import { db } from "../db/index.js";
import { retrospectives } from "../db/schema.js";

export class RetrospectiveService {
  async getBySlug(slug: string) {
    const result = await db.select().from(retrospectives).where(eq(retrospectives.slug, slug)).limit(1);
    return result[0];
  }

  
  async getByOwner(owner_id: string) {
    return await db.select().from(retrospectives).where(eq(retrospectives.owner_id, owner_id)).orderBy(desc(retrospectives.updated_at));
  }

  async getById(id: string) {
    const result = await db.select().from(retrospectives).where(eq(retrospectives.id, id)).limit(1);
    return result[0];
  }

  async create(data: any) {
    const result = await db.insert(retrospectives).values({
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    }).returning();
    return result[0];
  }

  async update(id: string, data: any) {
    const result = await db
      .update(retrospectives)
      .set({ ...data, updated_at: new Date() })
      .where(eq(retrospectives.id, id))
      .returning();
    return result[0];
  }

  async publish(id: string) {
    return this.update(id, { status: "published", published_at: new Date() });
  }

  async unpublish(id: string) {
    return this.update(id, { status: "draft" });
  }

  async delete(id: string) {
    await db.delete(retrospectives).where(eq(retrospectives.id, id));
    return { success: true };
  }
}

export const retrospectiveService = new RetrospectiveService();
