import { pgTable, text, serial, integer, boolean, timestamp, doublePrecision } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name"),
  created_at: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  name: true,
});

// Products Table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  donor_id: integer("donor_id").references(() => users.id),
  image_url: text("image_url"),
  is_available: boolean("is_available").default(true),
  created_at: timestamp("created_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  description: true,
  category: true,
  donor_id: true,
  image_url: true,
});

// Agents Table
export const agents = pgTable("agents", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  area: text("area").notNull(),
  rating: doublePrecision("rating").default(5.0),
  bio: text("bio"),
  image_url: text("image_url"),
  user_id: integer("user_id").references(() => users.id),
  created_at: timestamp("created_at").defaultNow(),
});

export const insertAgentSchema = createInsertSchema(agents).pick({
  name: true,
  area: true,
  rating: true,
  bio: true,
  image_url: true,
  user_id: true,
});

// Donations Table
export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  donor_name: text("donor_name").notNull(),
  email: text("email").notNull(),
  amount: doublePrecision("amount").notNull(),
  message: text("message"),
  created_at: timestamp("created_at").defaultNow(),
});

export const insertDonationSchema = createInsertSchema(donations).pick({
  donor_name: true,
  email: true,
  amount: true,
  message: true,
});

// Export Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Agent = typeof agents.$inferSelect;
export type InsertAgent = z.infer<typeof insertAgentSchema>;

export type Donation = typeof donations.$inferSelect;
export type InsertDonation = z.infer<typeof insertDonationSchema>;
