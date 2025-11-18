import { Component, Input, Signal, WritableSignal, inject, signal } from '@angular/core';
import { User, UserService } from '../../service/UserService';
import { FormsModule } from '@angular/forms';
import { UserCardDetail } from '../user-card-detail/user-card-detail';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    FormsModule
    , UserCardDetail
  ],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
})

export class UserCard {

  id: number | undefined;
  name: string | undefined;

  isTyping: WritableSignal<boolean> = signal(false);
  buttonClicked: WritableSignal<boolean> = signal(false);

  public userService: UserService = inject(UserService);
  public users = this.userService.UserCards;

  @Input() user: User | null = null;

  onButtonClick(id : number, name: string): void {
    this.buttonClicked.set(true);
    
    if (id !== undefined && name !== undefined) {
      this.userService.addUser({ id, name });
    } else {
      console.error('ID or Name is undefined');
    }
  }
}
