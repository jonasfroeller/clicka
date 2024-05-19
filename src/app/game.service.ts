import {Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import {BoughtUpgrade, GameSave, ReceivedAchievement} from "./types";
import {Subject, tap} from "rxjs";
import {achievements} from "./achievements";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  updateScoreInterval: NodeJS.Timeout | undefined;
  #gameSaveKey = 'clicka-save:-1';
  #gameSave: GameSave | null = null;

  constructor(private localStorageService: LocalStorageService) {
    this.gameSave.pipe(tap(val => console.log("game save was updated to ", val))).subscribe(v => {
      this.#gameSave = v;
    });
  }

  private _gameSave = new Subject<GameSave>();

  get gameSave(): Subject<GameSave> {
    return this._gameSave;
  }

  get saves(): Record<string, string> {
    return this.localStorageService.getItemsStartingWith('clicka-save:');
  }

  set clicks(amount: number) {
    if (!this.#gameSave) return;

    console.log("incrementing clicks by ", amount);
    this.#gameSave.score += amount;
    this.#gameSave.score = Math.round(this.#gameSave.score * 100) / 100;
    this.gameSave.next(this.#gameSave);
    this.saveGame();
  }

  gameLoop(): void {
    clearInterval(this.updateScoreInterval);
    this.updateScoreInterval = setInterval(() => {
      this.updateScore();
    }, 1000);
  }

  buyUpgrade(upgrade: BoughtUpgrade) {
    if (!this.#gameSave) return;

    const index = this.#gameSave.upgrades.findIndex(a => a.name === upgrade.name);
    const upgradeAtIndex = this.#gameSave.upgrades[index];

    // add or increase amount
    if (!this.#gameSave.upgrades.some(a => a.name === upgrade.name)) {
      // @ts-ignore
      this.#gameSave.upgrades.push(upgrade)
    } else {
      upgradeAtIndex.amount += 1;
      if (!upgradeAtIndex.yieldPerSecond) upgradeAtIndex.yieldPerSecond = 0;
      upgradeAtIndex.yieldPerSecond += 1;
      upgradeAtIndex.updatedAt = new Date();
    }

    // calculate nextPrice
    this.#gameSave.score -= upgradeAtIndex.nextPrice;
    upgradeAtIndex.nextPrice = upgradeAtIndex.nextPrice + (upgrade.nextPrice * upgrade.amount);
    upgradeAtIndex.nextPrice = Math.round(upgradeAtIndex.nextPrice * 100) / 100;

    this.gameSave.next(this.#gameSave);
    this.saveGame();
    this.gameLoop();
  }

  buyClickValueUpgrade() {
    if (!this.#gameSave) return;

    const newClickValue = this.#gameSave.clickValue + (this.#gameSave.clickValueIncrementor * this.#gameSave.clickValue);
    this.#gameSave.score -= this.#gameSave.nextPrice;
    this.#gameSave.nextPrice = newClickValue * 100;
    this.#gameSave.clickValue = Math.round(newClickValue * 100) / 100;
    this.gameSave.next(this.#gameSave);
    this.saveGame();
  }

  checkForAchievements() {
    if (this.#gameSave && this.#gameSave.achievements) {
      for (const achievement of achievements) {
        if (achievement.condition(this.#gameSave).isAchieved) {
          console.log(`achievement ${achievement.name} was reached`);
          const achievementReached: ReceivedAchievement = {
            receivedAt: new Date(),
            name: achievement.name,
            description: achievement.description
          }

          // @ts-ignore
          if (!this.#gameSave.achievements.some(a => a.name === achievementReached.name)) this.#gameSave.achievements.push(achievementReached);
        }
      }
    }
  }

  calculateTotalYieldPerSecond() {
    if (this.#gameSave && this.#gameSave.upgrades) {
      this.#gameSave.totalYieldPerSecond = this.#gameSave.upgrades.reduce((acc, upgrade) => {
        return acc + (upgrade.yieldPerSecond ?? 0);
      }, 0);
    }
  }

  saveGame() {
    console.log("calculated total yield per second");
    this.calculateTotalYieldPerSecond();
    console.log("checking for new achievements");
    this.checkForAchievements();
    console.log("saving game to local storage");
    this.localStorageService.setItem(this.#gameSaveKey, this.#gameSave);
  }

  loadGameByKey(saveKey: string): void {
    console.log(`loading game save with key ${saveKey} from local storage`);
    this.#gameSave = this.localStorageService.getItem(saveKey);
    this.#gameSaveKey = saveKey;

    this.createNewGameIfNonePresent();
    this.gameSave.next(this.#gameSave!);
  }

  loadGame() {
    console.log("loading game save from local storage");
    this.#gameSave = this.localStorageService.getItem(this.#gameSaveKey);

    this.createNewGameIfNonePresent();
    this.gameSave.next(this.#gameSave!);
  }

  createNewGameIfNonePresent() {
    if (!this.#gameSave) {
      this.#gameSave = {
        name: "Save 1",
        description: "First save",
        score: 0,
        clickValue: 1,
        totalYieldPerSecond: 0,
        clickValueIncrementor: 0.1,
        nextPrice: 10,
        date: new Date(),
        achievements: [] as ReceivedAchievement[],
        upgrades: [] as BoughtUpgrade[]
      };

      console.log("no game save found, creating new one");

      this.saveGame();
      return true;
    }

    return false;
  }

  private updateScore(): void {
    if (!this.#gameSave) return;

    this.#gameSave.score += this.#gameSave.totalYieldPerSecond;
    this.#gameSave.score = Math.round(this.#gameSave.score * 100) / 100;
    this.gameSave.next(this.#gameSave);
    this.saveGame();
  }
}
