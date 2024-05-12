import {Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import {GameSave} from "./types";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private localStorageService: LocalStorageService) { }

  #gameSaveKey = 'clicka-save';
  #gameSave: GameSave | null = null;
  private _clicks = new Subject<number>();
  private _clickValue = new Subject<number>();

  saveGame() {
    this.localStorageService.setItem(this.#gameSaveKey, this.#gameSave);
  }

  loadGame() {
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

      this.saveGame();
    }

    this._clicks.next(this.#gameSave.score);
    this._clickValue.next(this.#gameSave.clickValue);
  }

  get clickValue(): Subject<number> {
    return this._clickValue;
  }

  private set clickValue(amount: number) {
    this._clickValue.next(amount);
  }

  get clicks(): Subject<number> {
    return this._clicks;
  }

  set clicks(amount: number) {
    this._clicks.next(amount);
  }
}
