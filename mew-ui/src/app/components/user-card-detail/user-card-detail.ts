import { Component, inject, Input } from '@angular/core';
import { User } from '../../service/UserService.service';
import { Game, GameService } from '../../service/GameService.service';
import { GameCard } from '../game-card/game-card';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-card-detail',
  imports: [
    GameCard,
    JsonPipe
  ],
  templateUrl: './user-card-detail.html',
  styleUrl: './user-card-detail.scss',
})
export class UserCardDetail {

  public readonly gameService = inject(GameService);
  public games = this.gameService.GameCards;

  @Input() user: User | null = null;
}
