import { Component, inject, Input } from '@angular/core';
import { User } from '../../service/UserService.service';
import { Game, GameService } from '../../service/GameService.service';

@Component({
  selector: 'app-game-card',
  imports: [],
  templateUrl: './game-card.html',
  styleUrl: './game-card.scss',
})
export class GameCard {

  public gameService: GameService = inject(GameService);
  public games = this.gameService.GameCards;

  id: number | undefined;
  title: string | undefined;
  isSinglePlayer: boolean | undefined;
  isMultiPlayer: boolean | undefined; 
  genreId: number | undefined;
  userIds: number[] | undefined;

  @Input() game: Game | null = null;

  public trackGameById(index: number, game: Game): number {
    return game.id;
  }


}
