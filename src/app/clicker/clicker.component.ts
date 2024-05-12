import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from "../game.service";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-clicker',
  standalone: true,
  imports: [],
  templateUrl: './clicker.component.html',
  styleUrl: './clicker.component.scss'
})
export class ClickerComponent implements OnInit, OnDestroy {

  constructor(private gameService: GameService) { }

  private clickValueSubscription!: Subscription;
  clickValue: number = 1;
  private scoreSubscription!: Subscription;
  score: number = 0;

  onButtonClick() {
    this.gameService.clicks = this.clickValue;
    this.gameService.saveGame();
  }

  ngOnInit() {
    this.gameService.loadGame();

    this.clickValueSubscription = this.gameService.clickValue.pipe(tap(val => console.log("clickValue", val))).subscribe(v => {
      this.clickValue += v;
    });

    this.scoreSubscription = this.gameService.clicks.pipe(tap(val => console.log("clicks", val))).subscribe(v => {
      this.score += v;
    });
  }

  ngOnDestroy(): void {
    this.clickValueSubscription.unsubscribe();
    this.scoreSubscription.unsubscribe();
  }
}
