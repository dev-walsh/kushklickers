import { 
  type Player, 
  type InsertPlayer,
  type Upgrade,
  type InsertUpgrade,
  type PlayerUpgrade,
  type InsertPlayerUpgrade,
  type Achievement,
  type InsertAchievement,
  type PlayerAchievement,
  type InsertPlayerAchievement
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Player operations
  getPlayer(id: string): Promise<Player | undefined>;
  getPlayerByUsername(username: string): Promise<Player | undefined>;
  createPlayer(player: InsertPlayer): Promise<Player>;
  updatePlayer(id: string, updates: Partial<Player>): Promise<Player | undefined>;
  getTopPlayers(limit?: number): Promise<Player[]>;
  
  // Upgrade operations
  getAllUpgrades(): Promise<Upgrade[]>;
  getUpgrade(id: string): Promise<Upgrade | undefined>;
  createUpgrade(upgrade: InsertUpgrade): Promise<Upgrade>;
  
  // Player upgrade operations
  getPlayerUpgrades(playerId: string): Promise<PlayerUpgrade[]>;
  buyUpgrade(playerUpgrade: InsertPlayerUpgrade): Promise<PlayerUpgrade>;
  
  // Achievement operations
  getAllAchievements(): Promise<Achievement[]>;
  getPlayerAchievements(playerId: string): Promise<PlayerAchievement[]>;
  updatePlayerAchievement(playerId: string, achievementId: string, progress: number): Promise<PlayerAchievement>;
}

export class MemStorage implements IStorage {
  private players: Map<string, Player>;
  private upgrades: Map<string, Upgrade>;
  private playerUpgrades: Map<string, PlayerUpgrade>;
  private achievements: Map<string, Achievement>;
  private playerAchievements: Map<string, PlayerAchievement>;

  constructor() {
    this.players = new Map();
    this.upgrades = new Map();
    this.playerUpgrades = new Map();
    this.achievements = new Map();
    this.playerAchievements = new Map();
    
    this.initializeGameData();
  }

  private initializeGameData() {
    // Initialize default upgrades
    const defaultUpgrades: InsertUpgrade[] = [
      {
        name: "Better Fingers",
        description: "+1 Kush per click",
        baseCost: 15,
        costMultiplier: 150,
        clickPowerIncrease: 1,
        autoIncomeIncrease: 0,
        icon: "fas fa-hand-pointer",
        category: "click",
        unlockRequirement: 0
      },
      {
        name: "Auto Clicker",
        description: "+0.5 Kush per second",
        baseCost: 100,
        costMultiplier: 150,
        clickPowerIncrease: 0,
        autoIncomeIncrease: 1800, // 0.5 per second = 1800 per hour
        icon: "fas fa-mouse-pointer",
        category: "auto",
        unlockRequirement: 50
      },
      {
        name: "Lucky Fingers",
        description: "+2 Kush per click",
        baseCost: 500,
        costMultiplier: 150,
        clickPowerIncrease: 2,
        autoIncomeIncrease: 0,
        icon: "fas fa-magic",
        category: "click",
        unlockRequirement: 200
      },
      {
        name: "Golden Touch",
        description: "+5 Kush per click",
        baseCost: 2000,
        costMultiplier: 150,
        clickPowerIncrease: 5,
        autoIncomeIncrease: 0,
        icon: "fas fa-gem",
        category: "special",
        unlockRequirement: 1000
      },
      {
        name: "Kush Farm",
        description: "+5 Kush per second",
        baseCost: 5000,
        costMultiplier: 150,
        clickPowerIncrease: 0,
        autoIncomeIncrease: 18000, // 5 per second = 18000 per hour
        icon: "fas fa-seedling",
        category: "auto",
        unlockRequirement: 2500
      }
    ];

    defaultUpgrades.forEach(upgrade => {
      const id = randomUUID();
      this.upgrades.set(id, { 
        ...upgrade, 
        id,
        costMultiplier: upgrade.costMultiplier || 150,
        clickPowerIncrease: upgrade.clickPowerIncrease || 0,
        autoIncomeIncrease: upgrade.autoIncomeIncrease || 0,
        unlockRequirement: upgrade.unlockRequirement || 0
      });
    });

    // Initialize default achievements
    const defaultAchievements: InsertAchievement[] = [
      {
        name: "First Steps",
        description: "Click 10 times",
        requirement: 10,
        requirementType: "total_clicks",
        reward: 5,
        icon: "fas fa-baby"
      },
      {
        name: "Collect 5 KUSH",
        description: "Earn your first 5 KUSH",
        requirement: 5,
        requirementType: "total_kush",
        reward: 10,
        icon: "fas fa-cannabis"
      },
      {
        name: "Green Thumb",
        description: "Reach 25 total KUSH",
        requirement: 25,
        requirementType: "total_kush",
        reward: 25,
        icon: "fas fa-thumbs-up"
      },
      {
        name: "Speed Demon",
        description: "Click 250 times",
        requirement: 250,
        requirementType: "total_clicks",
        reward: 50,
        icon: "fas fa-tachometer-alt"
      },
      {
        name: "Kush Collector",
        description: "Collect 1,000 KUSH",
        requirement: 1000,
        requirementType: "total_kush",
        reward: 500,
        icon: "fas fa-coins"
      },
      {
        name: "Big Spender",
        description: "Buy 5 upgrades",
        requirement: 5,
        requirementType: "upgrades_bought",
        reward: 100,
        icon: "fas fa-shopping-cart"
      }
    ];

    defaultAchievements.forEach(achievement => {
      const id = randomUUID();
      this.achievements.set(id, { ...achievement, id });
    });
  }

  async getPlayer(id: string): Promise<Player | undefined> {
    return this.players.get(id);
  }

  async getPlayerByUsername(username: string): Promise<Player | undefined> {
    return Array.from(this.players.values()).find(
      (player) => player.username === username,
    );
  }

  async createPlayer(insertPlayer: InsertPlayer): Promise<Player> {
    const id = randomUUID();
    const player: Player = { 
      ...insertPlayer, 
      id,
      totalKush: insertPlayer.totalKush || 0,
      totalClicks: insertPlayer.totalClicks || 0,
      perClickMultiplier: insertPlayer.perClickMultiplier || 1,
      autoIncomePerHour: insertPlayer.autoIncomePerHour || 0,
      claimableTokens: insertPlayer.claimableTokens || 0,
      walletAddress: insertPlayer.walletAddress || null,
      referredBy: insertPlayer.referredBy || null,
      createdAt: new Date(),
      lastActive: new Date()
    };
    this.players.set(id, player);
    
    // Initialize player achievements
    for (const achievementId of Array.from(this.achievements.keys())) {
      const playerAchievementId = randomUUID();
      this.playerAchievements.set(playerAchievementId, {
        id: playerAchievementId,
        playerId: id,
        achievementId,
        completed: false,
        progress: 0,
        completedAt: null
      });
    }
    
    return player;
  }

  async updatePlayer(id: string, updates: Partial<Player>): Promise<Player | undefined> {
    const player = this.players.get(id);
    if (!player) return undefined;
    
    const updatedPlayer = { ...player, ...updates, lastActive: new Date() };
    this.players.set(id, updatedPlayer);
    return updatedPlayer;
  }

  async getTopPlayers(limit: number = 10): Promise<Player[]> {
    return Array.from(this.players.values())
      .sort((a, b) => b.totalKush - a.totalKush)
      .slice(0, limit);
  }

  async getAllUpgrades(): Promise<Upgrade[]> {
    return Array.from(this.upgrades.values());
  }

  async getUpgrade(id: string): Promise<Upgrade | undefined> {
    return this.upgrades.get(id);
  }

  async createUpgrade(upgrade: InsertUpgrade): Promise<Upgrade> {
    const id = randomUUID();
    const newUpgrade: Upgrade = { 
      ...upgrade, 
      id,
      costMultiplier: upgrade.costMultiplier || 150,
      clickPowerIncrease: upgrade.clickPowerIncrease || 0,
      autoIncomeIncrease: upgrade.autoIncomeIncrease || 0,
      unlockRequirement: upgrade.unlockRequirement || 0
    };
    this.upgrades.set(id, newUpgrade);
    return newUpgrade;
  }

  async getPlayerUpgrades(playerId: string): Promise<PlayerUpgrade[]> {
    return Array.from(this.playerUpgrades.values()).filter(
      (pu) => pu.playerId === playerId
    );
  }

  async buyUpgrade(playerUpgrade: InsertPlayerUpgrade): Promise<PlayerUpgrade> {
    const id = randomUUID();
    const newPlayerUpgrade: PlayerUpgrade = { 
      ...playerUpgrade, 
      id,
      quantity: playerUpgrade.quantity || 0,
      purchasedAt: new Date()
    };
    this.playerUpgrades.set(id, newPlayerUpgrade);
    return newPlayerUpgrade;
  }

  async getAllAchievements(): Promise<Achievement[]> {
    return Array.from(this.achievements.values());
  }

  async getPlayerAchievements(playerId: string): Promise<PlayerAchievement[]> {
    return Array.from(this.playerAchievements.values()).filter(
      (pa) => pa.playerId === playerId
    );
  }

  async updatePlayerAchievement(playerId: string, achievementId: string, progress: number): Promise<PlayerAchievement> {
    const playerAchievement = Array.from(this.playerAchievements.values()).find(
      (pa) => pa.playerId === playerId && pa.achievementId === achievementId
    );
    
    if (!playerAchievement) {
      throw new Error("Player achievement not found");
    }

    const achievement = this.achievements.get(achievementId);
    const completed = achievement ? progress >= achievement.requirement : false;
    
    const updated: PlayerAchievement = {
      ...playerAchievement,
      progress,
      completed,
      completedAt: completed ? new Date() : null
    };
    
    this.playerAchievements.set(playerAchievement.id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
