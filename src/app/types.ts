export interface Upgrade {
  name: string;
  description: string;
  yieldPerSecond: number;
  nextPrice: number;
}

export interface UpgradeActions extends Upgrade {
  onBuy: string;
}

export interface BoughtUpgrade extends Upgrade {
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export type Achievement = {
  name: string;
  description: string;
  receivedAt: Date
}

export type GameSave = {
  name: string;
  description: string;
  score: number;
  clickValue: number;
  nextPrice: number;
  clickValueIncrementor: number;
  totalYieldPerSecond: number;
  date: Date;
  achievements: Achievement[] | [];
  upgrades: Upgrade[] | [];
}
