import {Injectable} from '@angular/core';
import {MessagingService} from './messaging.service';
import {Message} from '@stomp/stompjs';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {GamePlayer} from '../../model/game-player';
import {map} from 'rxjs/operators';
import {LocalStorageService} from '../local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class GamePlayerSocketService {

  private gamePlayersSubject = new BehaviorSubject<GamePlayer[]>([]);
  private messagingService: MessagingService;

  constructor(private localStorageService: LocalStorageService) {
    this.messagingService = new MessagingService(environment.WS_PATH + '/game', '/topic/game-players');
    this.messagingService.stream().subscribe((message: Message) => {
      console.log('GAME_PLAYER CAME:');
      console.log(message.body);
      this.gamePlayersSubject.next([...JSON.parse(message.body)]);
    });
  }

  getGamePlayers(): Observable<GamePlayer[]> {
    return this.gamePlayersSubject.asObservable();
  }

  getSessionPlayer() {
    return this.getGamePlayers().pipe(
      map(players => players.find(player => this.localStorageService.isSessionPlayer(player.id))));
  }

  //    Blueprint how to send messages directly via websocket
  // registerPlayer(playerName: string) {
  //   this.messagingService.send("/players", playerName);
  // }
}
