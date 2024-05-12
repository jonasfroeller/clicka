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

  constructor(private gameService: GameService) { }

  private scoreSubscription!: Subscription;
  score: number = 0;

  ngOnInit() {
    this.scoreSubscription = this.gameService.clicks.subscribe(v => {
      this.score += v;
    });
  }

  ngOnDestroy(): void {
    this.scoreSubscription.unsubscribe();
  }
}
