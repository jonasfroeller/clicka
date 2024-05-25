import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {NgStyle} from "@angular/common";
import {GameSave, ReceiveAchievement} from "../types";
import {Subscription} from "rxjs";
import {GameService} from "../game.service";

@Component({
  selector: 'app-achievement-progress',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './achievement-progress.component.html',
  styleUrl: './achievement-progress.component.scss'
})
export class AchievementProgressComponent implements OnInit, OnDestroy, OnChanges {
  @Input() achievement: ReceiveAchievement | null = null;
  gameSave: GameSave | null = null;
  progress: number = 0;
  private gameSaveSubscription!: Subscription;

  constructor(private gameService: GameService) {
    this.gameSaveSubscription = this.gameService.gameSave.subscribe(v => {
      this.gameSave = v;
      this.updateProgress();
    });
  }

  ngOnInit(): void {
    this.updateProgress();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.updateProgress();
  }

  ngOnDestroy(): void {
    this.gameSaveSubscription.unsubscribe();
  }

  private updateProgress(): void {
    if (this.achievement && this.gameSave) {
      // @ts-ignore
      this.progress = this.achievement.condition(this.gameSave).progress * 100;
    } else {
      this.progress = 0;
    }
  }
}
