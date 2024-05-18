import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {GameService} from "../game.service";
import {NgForOf, NgIf} from "@angular/common";
import {upgrades} from "../upgrades";
import {UpgradeActions} from "../types";

@Component({
  selector: 'app-upgrade',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './upgrade.component.html',
  styleUrl: './upgrade.component.scss'
})
export class UpgradeComponent implements OnDestroy {
  clickValue: number = 1;
  nextPrice: number = 10;
  score: number = 0;
  clickValueIncrement: number = 1;

  filteredUpgrades: UpgradeActions[] = upgrades;
  loading = false;
  private gameSaveSubscription!: Subscription;

  constructor(private gameService: GameService) {
    this.gameSaveSubscription = this.gameService.gameSave.subscribe(v => {
      this.clickValue = v.clickValue;
      this.clickValueIncrement = v.clickValueIncrementor * this.clickValue;
      this.nextPrice = v.nextPrice;
      this.score = v.score;
    });
  }

  searchUpgrade($event: Event) {
    const searchValue = ($event.target as HTMLInputElement).value.toLowerCase();
    this.loading = true;
    this.filteredUpgrades = upgrades.filter(upgrade => upgrade.name.toLowerCase().includes(searchValue));
    this.loading = false;
  }

  onClick(functionName: string) {
    // @ts-ignore
    this[functionName]();
  }

  buyClickValueUpgrade() {
    this.gameService.buyClickValueUpgrade();
  }

  ngOnDestroy(): void {
    this.gameSaveSubscription.unsubscribe();
  }

  // TODO:
  // Use an interval for upgrades that generate resources over time. Start the
  // Observable only as soon as the first upgrade is acquired.
  // TODO: show amount of upgrade, yieldPerSecond
}
