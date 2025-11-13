import { Component, Input, Signal, WritableSignal, signal } from '@angular/core';
import { UserService } from '../../service/UserService';
import { FormsModule } from '@angular/forms';
import { UserCardDetail } from '../user-card-detail/user-card-detail';

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
  userService: any;
  isTyping: WritableSignal<boolean> = signal(false);
  buttonClicked: WritableSignal<boolean> = signal(false);

  @Input() user: UserCard | null = null;

  onButtonClick(id : number, name: string): void {
    this.buttonClicked.set(true);
    
    if (id !== undefined && name !== undefined) {
      this.userService.addUser({ id, name });
    } else {
      console.error('ID or Name is undefined');
    }
  }
}
