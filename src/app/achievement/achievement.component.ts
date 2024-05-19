import {Component, OnDestroy} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {ReceiveAchievement, ReceivedAchievement} from "../types";
import {Subscription} from "rxjs";
import {GameService} from "../game.service";
import {achievements} from "../achievements";
import {dateFormatter} from "../beautify";
import {NgStyle} from "@angular/common";
import {AchievementProgressComponent} from "../achievement-progress/achievement-progress.component";

@Component({
  selector: 'app-achievement',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgStyle,
    AchievementProgressComponent
  ],
  templateUrl: './achievement.component.html',
  styleUrl: './achievement.component.scss'
})
export class AchievementComponent implements OnDestroy {

  achievements: ReceivedAchievement[] = [];
  missingAchievements: ReceiveAchievement[] = achievements;
  protected readonly dateFormatter = dateFormatter;
  private gameSaveSubscription!: Subscription;

  constructor(private gameService: GameService) {
    this.gameSaveSubscription = this.gameService.gameSave.subscribe(v => {
      this.achievements = v.achievements;

      this.missingAchievements = this.missingAchievements
        .filter(achievement =>
          !this.achievements.some(a => a.name === achievement.name));
    });
  }

  ngOnDestroy(): void {
    this.gameSaveSubscription.unsubscribe();
  }

  stringToDate(string: string): Date { // temporary fix
    return new Date(string);
  }
}

// TODO: fix weird state error
