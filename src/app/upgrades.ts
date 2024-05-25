import {UpgradeActions} from "./types";

export let upgrades: UpgradeActions[] = [
  {
    name: "Hobbylosa",
    description: "Bissl mehr click powa.",
    yieldPerSecond: null,
    nextPrice: 10,
    onBuy: "buyClickValueUpgrade",
    amount: 0
  },
  {
    name: "Entrepreneur",
    description: "Passives Einkommen.",
    yieldPerSecond: 1,
    nextPrice: 250,
    onBuy: "buyUpgrade",
    amount: 0
  }
]
