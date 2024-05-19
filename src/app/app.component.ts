import {AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, signal, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {UpgradeComponent} from "./upgrade/upgrade.component";
import {ClickerComponent} from "./clicker/clicker.component";
import {AchievementComponent} from "./achievement/achievement.component";
import {StatisticComponent} from "./statistic/statistic.component";
import {GameService} from "./game.service";
import {GameLoaderComponent} from "./game-loader/game-loader.component";
import {isPlatformBrowser} from "@angular/common";
import {DraggableDirective} from "./draggable.directive";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UpgradeComponent, ClickerComponent, AchievementComponent, StatisticComponent, GameLoaderComponent, DraggableDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'clicka';
  @ViewChild('spotifyIframe') spotifyIframe: any;
  isBrowser = signal(false);

  constructor(private gameService: GameService, @Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser.set(isPlatformBrowser(platformId));
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

        // this.spotifyIframe.nativeElement.contentWindow.postMessage({command: 'toggle'}, '*');
        document.removeEventListener('click', handleClick);
      };

      document.addEventListener('click', handleClick);
    }

    this.spotifyIframe.nativeElement.addEventListener('load', playMusic);

    if (this.isBrowser()) {
      this.gameService.gameLoop();
    }
  }
}
