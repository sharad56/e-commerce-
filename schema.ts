import { pgTable, text, serial, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Product types from Platzi API
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Review = {
  id: number;
  productId: number;
  userId: number;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(1, "Review comment is required"),
});

export type InsertReview = z.infer<typeof reviewSchema>;