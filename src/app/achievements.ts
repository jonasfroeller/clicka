import {BoughtUpgrade, GameSave, ReceiveAchievement, ReceivedAchievement} from "./types";

type ScoreSpecificAchievementParameters = {
  score: number;
  clickValue: number;
  totalYieldPerSecond: number;
}

type InfoSpecificAchievementParameters = {
  nextPrice: number;
  clickValueIncrementor: number;
  date: number;
}

type ProgressSpecificAchievementParameters = {
  achievements: ReceivedAchievement[] | [];
  upgrades: BoughtUpgrade[] | [];
};

export let achievements: ReceiveAchievement[] = [
  {
    name: "Buy your first upgrade.",
    description: "Bissl mehr click powa.",
    hasProgress: false,
    condition: (params: GameSave) => {
      let isAchieved = false;

      if (params.achievements.length > 0) {
        isAchieved = true
      }

      return {
        isAchieved,
        progress: null
      }
    }
  },
  {
    name: "Get your first achievement.",
    description: "Juhuuu!",
    hasProgress: false,
    condition: (params: GameSave) => {
      let isAchieved = false;

      if (params.upgrades.length > 0) {
        isAchieved = true
      }

      return {
        isAchieved,
        progress: null
      }
    }
  },
  {
    name: "Get a score of 100.",
    description: "First milestone.",
    hasProgress: true,
    condition: (params: GameSave) => {
      let isAchieved = false;

      if (params.score > 100) {
        isAchieved = true
      }

      return {
        isAchieved,
        progress: params.score / 100
      }
    }
  }
]
