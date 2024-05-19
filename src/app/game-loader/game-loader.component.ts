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
  protected readonly Object = Object;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.saves = this.gameService.saves;
  }

  loadGame(): void {
    this.gameService.loadGameByKey(this.selectedSaveKey);
  }
}

// TODO: create new game functionality
