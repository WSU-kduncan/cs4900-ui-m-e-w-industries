import { Component, inject, OnInit, signal } from '@angular/core';
import { UserCard } from '../user-card/user-card';
import { UserService } from '../../service/UserService';

@Component({
  selector: 'app-dashboard-component',
  imports: [],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.scss',
})
export class DashboardComponent implements OnInit {

  private readonly userService = inject(UserService);

  userCards = signal<UserCard[]>([]);
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
