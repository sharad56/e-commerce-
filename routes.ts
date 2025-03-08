import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { reviewSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes and middleware first
  setupAuth(app);

  // Reviews API
  app.get("/api/products/:id/reviews", async (req, res) => {
    const productId = parseInt(req.params.id);
    const reviews = await storage.getReviews(productId);
    res.json(reviews);
  });

  app.post("/api/products/:id/reviews", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Must be logged in to review" });
    }

    try {
      const productId = parseInt(req.params.id);
      const reviewData = await reviewSchema.parseAsync(req.body);

      const review = await storage.createReview(
        productId,
        req.user.id,
        req.user.username,
        reviewData
      );

      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ message: "Invalid review data" });
    }
  });

  // Log successful auth setup
  console.log("Authentication routes and middleware configured");

  // Create and return HTTP server
  const httpServer = createServer(app);
  return httpServer;
}