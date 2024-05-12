export type GameSave = {
  name: string;
  description: string;
  score: number;
  clickValue: number;
  date: Date;
  achievements: [{ name: string; description: string; receivedAt: Date }] | [];
  upgrades: [{ name: string; description: string; amount: number; createdAt: Date; updatedAt: Date; nextPrice: number; }] | [];
}
