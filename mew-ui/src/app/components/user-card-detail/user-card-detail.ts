import { Component, inject, Input } from '@angular/core';
import { UserCard } from '../user-card/user-card';
import { User, UserService } from '../../service/UserService.service';

@Component({
  selector: 'app-user-card-detail',
  imports: [],
  templateUrl: './user-card-detail.html',
  styleUrl: './user-card-detail.scss',
})
export class UserCardDetail {

  @Input() user: User | null = null;
}
