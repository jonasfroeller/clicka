import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {GameService} from "../game.service";

@Component({
  selector: 'app-upgrade',
  standalone: true,
  imports: [],
  templateUrl: './upgrade.component.html',
  styleUrl: './upgrade.component.scss'
})
export class UpgradeComponent implements OnDestroy {
  clickValue: number = 1;
  private gameSaveSubscription!: Subscription;

  constructor(private gameService: GameService) {
    this.gameSaveSubscription = this.gameService.gameSave.subscribe(v => {
      this.clickValue = v.clickValue;
    });
  }

  onButtonClick() {
    this.gameService.clickValue = this.clickValue;
  }

  ngOnDestroy(): void {
    this.gameSaveSubscription.unsubscribe();
  }
}
