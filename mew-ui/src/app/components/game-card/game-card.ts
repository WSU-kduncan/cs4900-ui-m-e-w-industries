import { Component, Input } from '@angular/core';
import { User } from '../../service/UserService.service';
import { Game } from '../../service/GameService.service';

@Component({
  selector: 'app-game-card',
  imports: [],
  templateUrl: './game-card.html',
  styleUrl: './game-card.scss',
})
export class GameCard {

  id: number | undefined;
  title: string | undefined;
  isSinglePlayer: boolean | undefined;
  isMultiPlayer: boolean | undefined; 
  genre: string | undefined;
  userIds: number[] | undefined;

  @Input() game: Game | null = null;

  public trackGameById(index: number, game: Game): number {
    return game.id;
  }
}
