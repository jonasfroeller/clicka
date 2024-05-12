import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from "../game.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss'
})
export class StatisticComponent implements OnInit, OnDestroy {

  score: number = 0;
  private gameSaveSubscription!: Subscription;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.gameSaveSubscription = this.gameService.gameSave.subscribe(v => {
      this.score = v.score;
    });
  }

  ngOnDestroy(): void {
    this.gameSaveSubscription.unsubscribe();
  }
}
