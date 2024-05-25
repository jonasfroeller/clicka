// Upgrades
export interface Upgrade {
  name: string;
  description: string;
  yieldPerSecond: number | null;
  nextPrice: number;
  amount: number;
}

export interface UpgradeActions extends Upgrade {
  onBuy: string;
}

export interface BoughtUpgrade extends Upgrade {
  createdAt: Date;
  updatedAt: Date;
}

// Achievements
export type Achievement = {
  name: string;
  description: string;
}

export interface ReceivedAchievement extends Achievement {
  receivedAt: Date
}

export interface ReceiveAchievement extends Achievement {
  hasProgress: boolean;
  condition: (params: GameSave) => {
    isAchieved: boolean;
    progress: number | null; // 0 - 1
  };
}

// Game Progress
export type GameSave = {
  name: string;
  description: string;
  score: number;
  clickValue: number;
  nextPrice: number;
  clickValueIncrementor: number;
  totalYieldPerSecond: number;
  date: Date;
  achievements: ReceivedAchievement[] | [];
  upgrades: BoughtUpgrade[] | [];
}
