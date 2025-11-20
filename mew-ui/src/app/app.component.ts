import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserCard } from './components/user-card/user-card';
import { DashboardComponent } from "./components/dashboard-component/dashboard-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    DashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class App {
  protected readonly title = signal('mew-ui');
  // user: UserCard = new UserCard();
}
