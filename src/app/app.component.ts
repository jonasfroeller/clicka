import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {UpgradeComponent} from "./upgrade/upgrade.component";
import {ClickerComponent} from "./clicker/clicker.component";
import {AchievementComponent} from "./achievement/achievement.component";
import {StatisticComponent} from "./statistic/statistic.component";
import {GameService} from "./game.service";
import {GameLoaderComponent} from "./game-loader/game-loader.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UpgradeComponent, ClickerComponent, AchievementComponent, StatisticComponent, GameLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'clicka';
  @ViewChild('spotifyIframe') spotifyIframe: any;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.loadGame();
  }

  ngAfterViewInit(): void {
    const playMusic = () => {
      this.spotifyIframe.nativeElement.removeEventListener('load', playMusic);

      console.log('Iframe has finished loading');
      console.log(this.spotifyIframe.nativeElement.contentWindow);

      const handleClick = () => {
        console.log("First interaction registered");

        this.spotifyIframe.nativeElement.contentWindow.postMessage({command: 'toggle'}, '*');
        document.removeEventListener('click', handleClick);
      };

      document.addEventListener('click', handleClick);
    }

    this.spotifyIframe.nativeElement.addEventListener('load', playMusic);
  }
}
