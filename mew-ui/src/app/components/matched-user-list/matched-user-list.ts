import { Component, Input } from '@angular/core';
import { UserCard } from '../user-card/user-card';

@Component({
  selector: 'app-matched-user-list',
  standalone: true,
  imports: [
    UserCard
  ],
  templateUrl: './matched-user-list.html',
  styleUrl: './matched-user-list.scss',
})
export class MatchedUserList {

  @Input() matchedUsers: any | null = null;
}
