import { Component, inject, Input } from '@angular/core';
import { User } from '../../service/UserService.service';
import { Game } from '../../service/GameService.service';
import { GameCard } from '../game-card/game-card';

@Component({
  selector: 'app-user-card-detail',
  imports: [
  ],
  templateUrl: './user-card-detail.html',
  styleUrl: './user-card-detail.scss',
})
export class UserCardDetail {

  public gameCard: GameCard = inject(GameCard);

  @Input() user: User | null = null;
}
