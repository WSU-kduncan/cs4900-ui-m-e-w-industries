import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatchListComponent } from './match-list/match-list.component';  // ADD THIS LINE

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatchListComponent],  // ADD MatchListComponent HERE
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('mew-ui');
}