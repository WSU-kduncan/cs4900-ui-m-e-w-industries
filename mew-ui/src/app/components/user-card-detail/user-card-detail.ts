import { Component, Input } from '@angular/core';
import { UserCard } from '../user-card/user-card';

@Component({
  selector: 'app-user-card-detail',
  imports: [],
  templateUrl: './user-card-detail.html',
  styleUrl: './user-card-detail.scss',
})
export class UserCardDetail {

  @Input() user: UserCard | null = null;
}
