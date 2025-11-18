import { Component, inject, Input } from '@angular/core';
import { UserCard } from '../user-card/user-card';
import { UserService } from '../../service/UserService';

@Component({
  selector: 'app-user-card-detail',
  imports: [],
  templateUrl: './user-card-detail.html',
  styleUrl: './user-card-detail.scss',
})
export class UserCardDetail {

  private readonly userService = inject(UserService);

  @Input() user: UserCard | null = null;
}
