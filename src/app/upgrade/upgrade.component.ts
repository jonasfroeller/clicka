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
  updatedAt: string | number = -1;

  filteredUpgrades: UpgradeActions[] = upgrades;
  loading = false;
  private gameSaveSubscription!: Subscription;

  constructor(private gameService: GameService) {
    this.gameSaveSubscription = this.gameService.gameSave.subscribe(v => {
      this.clickValue = v.clickValue;
      this.clickValueIncrement = v.clickValueIncrementor * this.clickValue;
      this.nextPrice = v.nextPrice;
      this.score = v.score;

      let upgradesDidChange = true;
      if (this.updatedAt !== -1) {
        upgradesDidChange = (v.upgrades
          .filter(upgrade => !(upgrade.yieldPerSecond === null || upgrade.yieldPerSecond === 0))
          .filter(upgrade =>
            upgrades.some(() => {
              // console.log((new Date(JSON.parse(JSON.stringify(upgrade.updatedAt)))).getTime(), (new Date(JSON.parse(this.updatedAt as string))).getTime());
              return ((new Date(JSON.parse(JSON.stringify(upgrade.updatedAt)))).getTime() > (new Date(JSON.parse(this.updatedAt as string))).getTime())
            })))
          .length > 0
      }

      console.log("upgradesDidChange", upgradesDidChange);

      if (upgradesDidChange) {
        this.updatedAt = JSON.stringify(new Date());

        this.filteredUpgrades = [
          ...v.upgrades.map(upgrade => {
            return {
              name: upgrade.name,
              onBuy: "buyUpgrade",
              description: upgrade.description,
              nextPrice: upgrade.nextPrice,
              yieldPerSecond: upgrade.yieldPerSecond,
              amount: upgrade.amount
            };
          }),
          ...upgrades
            .filter(upgrade => !v.upgrades.some(a => a.name === upgrade.name))
            .map(upgrade => {
                return {
                  name: upgrade.name,
                  onBuy: "buyUpgrade",
                  description: upgrade.description,
                  nextPrice: upgrade.nextPrice,
                  yieldPerSecond: upgrade.yieldPerSecond,
                  amount: upgrade.amount
                };
              }
            )
        ]
      }
    });
  }

  searchUpgrade($event: Event) {
    const searchValue = ($event.target as HTMLInputElement).value.toLowerCase();
    this.loading = true;
    this.filteredUpgrades = upgrades.filter(upgrade => upgrade.name.toLowerCase().includes(searchValue));
    this.loading = false;
  }

  onClick(functionName: string, upgrade: UpgradeActions, rootUpgrade = false) {
    if (rootUpgrade) functionName = "buyClickValueUpgrade";

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
}
