import { User, InsertUser, Review, InsertReview } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getReviews(productId: number): Promise<Review[]>;
  createReview(productId: number, userId: number, username: string, review: InsertReview): Promise<Review>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private reviews: Map<number, Review[]>;
  sessionStore: session.Store;
  currentUserId: number;
  currentReviewId: number;

  constructor() {
    this.users = new Map();
    this.reviews = new Map();
    this.currentUserId = 1;
    this.currentReviewId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getReviews(productId: number): Promise<Review[]> {
    return this.reviews.get(productId) || [];
  }

  async createReview(
    productId: number,
    userId: number,
    username: string,
    reviewData: InsertReview
  ): Promise<Review> {
    const review: Review = {
      id: this.currentReviewId++,
      productId,
      userId,
      username,
      ...reviewData,
      createdAt: new Date().toISOString(),
    };

    const productReviews = this.reviews.get(productId) || [];
    this.reviews.set(productId, [...productReviews, review]);

    return review;
  }
}

export const storage = new MemStorage();