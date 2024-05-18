import {UpgradeActions} from "./types";

export let upgrades: UpgradeActions[] = [
  {
    name: "Hobbylosa",
    description: "Bissl mehr click powa.",
    yieldPerSecond: 0,
    nextPrice: 10,
    onBuy: "buyClickValueUpgrade"
  }
]
