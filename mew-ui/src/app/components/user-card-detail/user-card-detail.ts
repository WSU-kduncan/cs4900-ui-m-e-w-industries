import { Component, inject, Input } from '@angular/core';
import { User } from '../../service/UserService.service';

@Component({
  selector: 'app-user-card-detail',
  imports: [],
  templateUrl: './user-card-detail.html',
  styleUrl: './user-card-detail.scss',
})
export class UserCardDetail {

  @Input() user: User | null = null;
}
