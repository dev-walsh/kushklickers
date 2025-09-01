import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const players = pgTable("players", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  totalKush: integer("total_kush").notNull().default(0),
  totalClicks: integer("total_clicks").notNull().default(0),
  perClickMultiplier: integer("per_click_multiplier").notNull().default(1),
  autoIncomePerHour: integer("auto_income_per_hour").notNull().default(0),
  claimableTokens: integer("claimable_tokens").notNull().default(0),
  walletAddress: text("wallet_address"),
  referredBy: text("referred_by"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
  lastActive: timestamp("last_active").notNull().default(sql`now()`),
});

export const upgrades = pgTable("upgrades", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  baseCost: integer("base_cost").notNull(),
  costMultiplier: integer("cost_multiplier").notNull().default(150), // 1.5x in percentage
  clickPowerIncrease: integer("click_power_increase").notNull().default(0),
  autoIncomeIncrease: integer("auto_income_increase").notNull().default(0),
  icon: text("icon").notNull(),
  category: text("category").notNull(), // 'click', 'auto', 'special'
  unlockRequirement: integer("unlock_requirement").notNull().default(0),
});

export const playerUpgrades = pgTable("player_upgrades", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  upgradeId: text("upgrade_id").notNull(),
  quantity: integer("quantity").notNull().default(0),
  purchasedAt: timestamp("purchased_at").notNull().default(sql`now()`),
});

export const achievements = pgTable("achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  requirement: integer("requirement").notNull(),
  requirementType: text("requirement_type").notNull(), // 'total_kush', 'total_clicks', 'upgrades_bought', etc.
  reward: integer("reward").notNull(),
  icon: text("icon").notNull(),
});

export const playerAchievements = pgTable("player_achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  playerId: text("player_id").notNull(),
  achievementId: text("achievement_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  progress: integer("progress").notNull().default(0),
  completedAt: timestamp("completed_at"),
});

export const insertPlayerSchema = createInsertSchema(players).omit({
  id: true,
  createdAt: true,
  lastActive: true,
});

export const insertUpgradeSchema = createInsertSchema(upgrades).omit({
  id: true,
});

export const insertPlayerUpgradeSchema = createInsertSchema(playerUpgrades).omit({
  id: true,
  purchasedAt: true,
});

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
});

export const insertPlayerAchievementSchema = createInsertSchema(playerAchievements).omit({
  id: true,
  completedAt: true,
});

export type InsertPlayer = z.infer<typeof insertPlayerSchema>;
export type Player = typeof players.$inferSelect;
export type InsertUpgrade = z.infer<typeof insertUpgradeSchema>;
export type Upgrade = typeof upgrades.$inferSelect;
export type InsertPlayerUpgrade = z.infer<typeof insertPlayerUpgradeSchema>;
export type PlayerUpgrade = typeof playerUpgrades.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type Achievement = typeof achievements.$inferSelect;
export type InsertPlayerAchievement = z.infer<typeof insertPlayerAchievementSchema>;
export type PlayerAchievement = typeof playerAchievements.$inferSelect;
