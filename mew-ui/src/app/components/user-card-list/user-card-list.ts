import { Component, inject } from '@angular/core';
import { UserCard } from '../user-card/user-card';
import { UserService } from '../../service/UserService';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-card-list',
  imports: [],
  templateUrl: './user-card-list.html',
  styleUrl: './user-card-list.scss',
})
export class UserCardList {

  private readonly userService = inject(UserService);

  public UserCards = toSignal(
    this.userService.get(),
    { initialValue: [] }
  );

  getUserCards() {
    return this.UserCards();
  }
  
}
