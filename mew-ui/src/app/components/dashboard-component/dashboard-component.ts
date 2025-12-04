import { Component, inject, OnInit, signal } from '@angular/core';
import { UserCard } from '../user-card/user-card';
import { UserService } from '../../service/UserService.service';
import { UserFormComponent } from "../user-form-component/user-form-component";
import { UpdateUserFormComponent } from "../update-user-form-component/update-user-form-component";
import { GameCard } from '../game-card/game-card';
import { GameService } from '../../service/GameService.service';

@Component({
  selector: 'app-dashboard-component',
  imports: [
    UserCard,
    UserFormComponent,
    UpdateUserFormComponent
],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.scss',
})
export class DashboardComponent implements OnInit {

  private readonly userService = inject(UserService);
  private readonly gameService = inject(GameService);
  deleteUserId: number | null = null;

  gameCards = signal<GameCard[]>([]);
  userCards = signal<UserCard[]>([]);
  isLoading = signal<boolean>(true);
  readonly users = this.userService.UserCards;
  
  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {

    this.isLoading.set(true);

    this.userService.getUsersFromBackend();
    this.gameService.getGamesFromBackend();
  };

  refreshDashboard(): void {
    this.loadDashboardData();
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        console.log(`User with ID ${userId} deleted successfully.`);
        this.loadDashboardData();
      },
      error: (err) => {
        console.error(`Error deleting user with ID ${userId}:`, err);
      }
    });
  }
}
