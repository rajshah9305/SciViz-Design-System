import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const layouts = pgTable("layouts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  complexity: text("complexity").notNull(),
  useCases: jsonb("use_cases").$type<string[]>().notNull(),
  features: jsonb("features").$type<string[]>().notNull(),
  performance: jsonb("performance").$type<{
    speed: number;
    accessibility: number;
    responsive: number;
  }>().notNull(),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
  icon: text("icon").notNull(),
  downloadCount: integer("download_count").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
});

export const interactions = pgTable("interactions", {
  id: serial("id").primaryKey(),
  layoutId: integer("layout_id").references(() => layouts.id),
  interactionType: text("interaction_type").notNull(), // 'view', 'download', 'preview'
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  userAgent: text("user_agent"),
  sessionId: text("session_id"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLayoutSchema = createInsertSchema(layouts).omit({
  id: true,
  lastUpdated: true,
  downloadCount: true,
});

export const insertInteractionSchema = createInsertSchema(interactions).omit({
  id: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Layout = typeof layouts.$inferSelect;
export type InsertLayout = z.infer<typeof insertLayoutSchema>;
export type Interaction = typeof interactions.$inferSelect;
export type InsertInteraction = z.infer<typeof insertInteractionSchema>;
