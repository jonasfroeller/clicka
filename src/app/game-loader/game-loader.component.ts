import {Component, OnInit} from '@angular/core';
import {GameService} from "../game.service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-game-loader',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './game-loader.component.html',
  styleUrl: './game-loader.component.scss'
})
export class GameLoaderComponent implements OnInit {
  saves: Record<string, string> = {};
  selectedSaveKey: string = 'clicka-save:-1';
  newGameName: string = '';

  protected readonly Object = Object;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.saves = this.gameService.saves;
  }

  loadGame(): void {
    this.gameService.loadGameByKey(this.selectedSaveKey);
    const gameToLoad = this.selectedSaveKey;
    this.gameService.setGameToLoad(gameToLoad);
  }

  createGame() {
    this.gameService.createNewGame(this.newGameName);
    this.reloadPage();
  }

  deleteGame(): void {
    this.gameService.deleteGameByKey(this.selectedSaveKey);
    this.reloadPage(); // needed, because I am too lazy to reset every state displayed on the screen.
  }

  reloadPage() {
    this.gameService.setGameToLoad('clicka-save:-1');

    try {
      if (!window) return false;

      window.location.reload();
      return true;
    } catch (e) {
      return false;
    }
  }
}
