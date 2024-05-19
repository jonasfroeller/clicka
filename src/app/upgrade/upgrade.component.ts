import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {GameService} from "../game.service";
import {NgForOf, NgIf} from "@angular/common";
import {upgrades} from "../upgrades";
import {BoughtUpgrade, UpgradeActions} from "../types";

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

  onClick(functionName: string, upgrade: UpgradeActions) {
    // @ts-ignore
    this[functionName](upgrade);
  }

  buyClickValueUpgrade(upgrade: UpgradeActions) {
    this.gameService.buyClickValueUpgrade();
  }

  buyUpgrade(upgrade: UpgradeActions) {
    const boughtUpgrade: BoughtUpgrade = {
      name: upgrade.name,
      description: upgrade.description,
      nextPrice: upgrade.nextPrice,
      yieldPerSecond: upgrade.yieldPerSecond,
      amount: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.gameService.buyUpgrade(boughtUpgrade);
  }

  ngOnDestroy(): void {
    this.gameSaveSubscription.unsubscribe();
  }

  // TODO: show amount of upgrade
}
