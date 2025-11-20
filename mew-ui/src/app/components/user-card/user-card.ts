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

  public userService: UserService = inject(UserService);
  public users = this.userService.UserCards;

  id: number | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  dob: string | undefined;
  email: string | undefined;
  gamertag: string | undefined;
  preferredConsole: string | undefined;

  buttonClicked: WritableSignal<boolean> = signal(false);
  // isTyping: WritableSignal<boolean> = signal(false);
 

  @Input() user: User | null = null;

  onButtonClick(id : number, firstName: string, lastName: string, dob: string, email: string, gamertag: string, preferredConsole: string): void {
    this.buttonClicked.set(true);
    
    if (id !== undefined && firstName !== undefined) {
      this.userService.addUser({ id, firstName, lastName: this.lastName || '', dob: this.dob || '', email: this.email || '', gamertag: this.gamertag || '', preferredConsole: this.preferredConsole || '' });
    } else {
      console.error('All fields are required to add a user.');
    }
  }
}
