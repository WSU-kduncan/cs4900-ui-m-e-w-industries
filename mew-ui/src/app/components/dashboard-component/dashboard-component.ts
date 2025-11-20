import { Component, inject, OnInit, signal } from '@angular/core';
import { UserCard } from '../user-card/user-card';
import { UserService } from '../../service/UserService.service';

@Component({
  selector: 'app-dashboard-component',
  imports: [
    UserCard
  ],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.scss',
})
export class DashboardComponent implements OnInit {

  private readonly userService = inject(UserService);

  userCards = signal<UserCard[]>([]);
  isLoading = signal<boolean>(true);
  readonly users = this.userService.UserCards;
  
  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {

    this.isLoading.set(true);

    this.userService.getUsersFromBackend();
  };
}
