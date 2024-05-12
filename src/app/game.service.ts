import {Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import {GameSave} from "./types";
import {Subject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  #gameSaveKey = 'clicka-save';
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

  set clicks(amount: number) {
    if (!this.#gameSave) return;

    console.log("incrementing clicks by ", amount);
    this.#gameSave.score += amount;
    this.gameSave.next(this.#gameSave);
    this.saveGame();
  }

  set clickValue(amount: number) {
    if (!this.#gameSave) return;

    console.log("incrementing clickValue by ", amount);
    this.#gameSave.clickValue += amount;
    this.gameSave.next(this.#gameSave);
    this.saveGame();
  }

  saveGame() {
    console.log("saving game to local storage");
    this.localStorageService.setItem(this.#gameSaveKey, this.#gameSave);
  }

  loadGame() {
    console.log("loading game save from local storage");
    this.#gameSave = this.localStorageService.getItem(this.#gameSaveKey);

    if (!this.#gameSave) {
      this.#gameSave = {
        name: "Save 1",
        description: "First save",
        score: 0,
        clickValue: 1,
        date: new Date(),
        achievements: [],
        upgrades: []
      }

      console.log("no game save found, creating new one");

      this.saveGame();
    }

    this.gameSave.next(this.#gameSave);
  }
}
