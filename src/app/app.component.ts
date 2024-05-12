import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UpgradeComponent} from "./upgrade/upgrade.component";
import {ClickerComponent} from "./clicker/clicker.component";
import {AchievementComponent} from "./achievement/achievement.component";
import {StatisticComponent} from "./statistic/statistic.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UpgradeComponent, ClickerComponent, AchievementComponent, StatisticComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'clicka';
}
