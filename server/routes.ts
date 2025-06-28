import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInteractionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all layouts
  app.get("/api/layouts", async (req, res) => {
    try {
      const layouts = await storage.getAllLayouts();
      res.json(layouts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch layouts" });
    }
  });

  // Get single layout
  app.get("/api/layouts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid layout ID" });
      }
      
      const layout = await storage.getLayout(id);
      if (!layout) {
        return res.status(404).json({ error: "Layout not found" });
      }
      
      res.json(layout);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch layout" });
    }
  });

  // Get layouts by category
  app.get("/api/layouts/category/:category", async (req, res) => {
    try {
      const category = decodeURIComponent(req.params.category);
      const layouts = await storage.getLayoutsByCategory(category);
      res.json(layouts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch layouts by category" });
    }
  });

  // Search layouts
  app.get("/api/layouts/search/:query", async (req, res) => {
    try {
      const query = decodeURIComponent(req.params.query);
      if (!query.trim()) {
        return res.status(400).json({ error: "Search query is required" });
      }
      
      const layouts = await storage.searchLayouts(query);
      res.json(layouts);
    } catch (error) {
      res.status(500).json({ error: "Failed to search layouts" });
    }
  });

  // Track layout interaction
  app.post("/api/interactions", async (req, res) => {
    try {
      const validation = insertInteractionSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          error: "Invalid interaction data",
          details: validation.error.errors 
        });
      }

      const interaction = await storage.createInteraction(validation.data);
      
      // If it's a download, update the layout download count
      if (validation.data.interactionType === 'download' && validation.data.layoutId) {
        await storage.updateLayoutDownloadCount(validation.data.layoutId);
      }
      
      res.json(interaction);
    } catch (error) {
      res.status(500).json({ error: "Failed to track interaction" });
    }
  });

  // Get interaction statistics
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getInteractionStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch statistics" });
    }
  });

  // Get categories
  app.get("/api/categories", async (req, res) => {
    try {
      const layouts = await storage.getAllLayouts();
      const categories = ['All Layouts', ...Array.from(new Set(layouts.map(layout => layout.category)))];
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
