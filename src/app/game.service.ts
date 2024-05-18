import {Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import {GameSave} from "./types";
import {Subject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {

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
    const clickaSaves: Record<string, string> = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!;
      if (key.startsWith('clicka-save:')) {
        clickaSaves[key] = JSON.parse(localStorage.getItem(key)!)!;
      }
    }

    console.log("saves: ", clickaSaves);
    return clickaSaves;
  }

  set clicks(amount: number) {
    if (!this.#gameSave) return;

    console.log("incrementing clicks by ", amount);
    this.#gameSave.score += amount;
    this.#gameSave.score = Math.round(this.#gameSave.score * 100) / 100;
    this.gameSave.next(this.#gameSave);
    this.saveGame();
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

  saveGame() {
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
        achievements: [],
        upgrades: []
      };

      console.log("no game save found, creating new one");

      this.saveGame();
      return true;
    }

    return false;
  }
}
