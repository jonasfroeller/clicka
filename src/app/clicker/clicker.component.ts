import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from "../game.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-clicker',
  standalone: true,
  imports: [],
  templateUrl: './clicker.component.html',
  styleUrl: './clicker.component.scss'
})
export class ClickerComponent implements OnDestroy {

  clickValue: number = 1;
  private gameSaveSubscription!: Subscription;

  constructor(private gameService: GameService) {
    this.gameSaveSubscription = this.gameService.gameSave.subscribe(v => {
      this.clickValue = v.clickValue;
    });
  }

  onButtonClick() {
    this.gameService.clicks = this.clickValue;
  }

  ngOnDestroy(): void {
    this.gameSaveSubscription.unsubscribe();
  }
}
