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
    name: "Get your first achievement.",
    description: "Juhuuu!",
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
  ...scoreAchievementMilestones()
]

function scoreAchievementMilestones() {
  const scoreAchievementMilestones: ReceiveAchievement[] = [];
  const scoresToReach = [10, 100, 250, 500, 1000];

  for (let i = 0; i < scoresToReach.length; i++) {
    scoreAchievementMilestones.push({
      name: `Score Milestone ${i + 1}`,
      description: `Get a score of ${scoresToReach[i]}.`,
      hasProgress: true,
      condition: (params: GameSave) => {
        return scoreAchievementBody(params, scoresToReach[i]);
      }
    })
  }

  return scoreAchievementMilestones;
}

function scoreAchievementBody(params: GameSave, score: number) {
  let isAchieved = false;

  if (params.score >= score) {
    isAchieved = true
  }

  return {
    isAchieved,
    progress: params.score / score
  }
}
