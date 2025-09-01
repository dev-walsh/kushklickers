import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPlayerSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get player by username
  app.get("/api/players/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const player = await storage.getPlayerByUsername(username);
      
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
      
      res.json(player);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create new player
  app.post("/api/players", async (req, res) => {
    try {
      const validatedData = insertPlayerSchema.parse(req.body);
      
      // Check if username already exists
      const existingPlayer = await storage.getPlayerByUsername(validatedData.username);
      if (existingPlayer) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const player = await storage.createPlayer(validatedData);
      res.status(201).json(player);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Update player stats
  app.patch("/api/players/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const player = await storage.updatePlayer(id, updates);
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
      
      res.json(player);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get leaderboard
  app.get("/api/leaderboard", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const players = await storage.getTopPlayers(limit);
      res.json(players);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all upgrades
  app.get("/api/upgrades", async (req, res) => {
    try {
      const upgrades = await storage.getAllUpgrades();
      res.json(upgrades);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get player upgrades
  app.get("/api/players/:id/upgrades", async (req, res) => {
    try {
      const { id } = req.params;
      const playerUpgrades = await storage.getPlayerUpgrades(id);
      res.json(playerUpgrades);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Buy upgrade
  app.post("/api/players/:id/upgrades", async (req, res) => {
    try {
      const { id } = req.params;
      const { upgradeId, quantity = 1 } = req.body;
      
      const player = await storage.getPlayer(id);
      const upgrade = await storage.getUpgrade(upgradeId);
      
      if (!player || !upgrade) {
        return res.status(404).json({ message: "Player or upgrade not found" });
      }

      // Calculate cost
      const playerUpgrades = await storage.getPlayerUpgrades(id);
      const existingUpgrade = playerUpgrades.find(pu => pu.upgradeId === upgradeId);
      const currentQuantity = existingUpgrade?.quantity || 0;
      
      let totalCost = 0;
      for (let i = 0; i < quantity; i++) {
        const multiplier = Math.pow(upgrade.costMultiplier / 100, currentQuantity + i);
        totalCost += Math.floor(upgrade.baseCost * multiplier);
      }
      
      if (player.totalKush < totalCost) {
        return res.status(400).json({ message: "Insufficient KUSH" });
      }
      
      // Update player stats
      const updatedPlayer = await storage.updatePlayer(id, {
        totalKush: player.totalKush - totalCost,
        perClickMultiplier: player.perClickMultiplier + (upgrade.clickPowerIncrease * quantity),
        autoIncomePerHour: player.autoIncomePerHour + (upgrade.autoIncomeIncrease * quantity)
      });
      
      // Add upgrade
      if (existingUpgrade) {
        await storage.buyUpgrade({
          playerId: id,
          upgradeId,
          quantity: currentQuantity + quantity
        });
      } else {
        await storage.buyUpgrade({
          playerId: id,
          upgradeId,
          quantity
        });
      }
      
      res.json({ player: updatedPlayer, cost: totalCost });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get all achievements
  app.get("/api/achievements", async (req, res) => {
    try {
      const achievements = await storage.getAllAchievements();
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get player achievements
  app.get("/api/players/:id/achievements", async (req, res) => {
    try {
      const { id } = req.params;
      const playerAchievements = await storage.getPlayerAchievements(id);
      const achievements = await storage.getAllAchievements();
      
      const achievementsWithProgress = achievements.map(achievement => {
        const playerAchievement = playerAchievements.find(pa => pa.achievementId === achievement.id);
        return {
          ...achievement,
          progress: playerAchievement?.progress || 0,
          completed: playerAchievement?.completed || false,
          completedAt: playerAchievement?.completedAt
        };
      });
      
      res.json(achievementsWithProgress);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Process click action
  app.post("/api/players/:id/click", async (req, res) => {
    try {
      const { id } = req.params;
      const player = await storage.getPlayer(id);
      
      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }
      
      const kushGained = player.perClickMultiplier;
      const updatedPlayer = await storage.updatePlayer(id, {
        totalKush: player.totalKush + kushGained,
        totalClicks: player.totalClicks + 1
      });
      
      // Check achievements
      const playerAchievements = await storage.getPlayerAchievements(id);
      const achievements = await storage.getAllAchievements();
      
      for (const achievement of achievements) {
        const playerAchievement = playerAchievements.find(pa => pa.achievementId === achievement.id);
        if (!playerAchievement?.completed) {
          let progress = 0;
          switch (achievement.requirementType) {
            case 'total_clicks':
              progress = updatedPlayer!.totalClicks;
              break;
            case 'total_kush':
              progress = updatedPlayer!.totalKush;
              break;
          }
          
          if (progress !== playerAchievement?.progress) {
            await storage.updatePlayerAchievement(id, achievement.id, progress);
          }
        }
      }
      
      res.json({ 
        player: updatedPlayer, 
        kushGained,
        totalKush: updatedPlayer!.totalKush 
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
