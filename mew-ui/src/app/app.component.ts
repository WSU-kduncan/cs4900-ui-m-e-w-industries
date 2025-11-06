import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserCard } from './components/user-card/user-card';
import { MatchedUserList } from './components/matched-user-list/matched-user-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserCard],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class App {
  protected readonly title = signal('mew-ui');
  user: UserCard = new UserCard();
}
