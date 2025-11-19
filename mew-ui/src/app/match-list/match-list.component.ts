import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchService } from '../services/match.service';
import { MatchDetailComponent } from '../match-detail/match-detail.component';



@Component({
  selector: 'app-match-list',
  standalone: true,
  imports: [CommonModule, MatchDetailComponent],
  templateUrl: './match-list.component.html',
  styleUrl: './match-list.component.css'
})
export class MatchListComponent {
  // Inject the MatchService
  private matchService = inject(MatchService);

  // Expose the matches signal from the service
  matches = this.matchService.matches;

  // Signals for form inputs
  newMatchName = signal('');
  newMatchGamertag = signal('');
  newMatchAbout = signal('');

  // Event handler for name input
  onNameInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.newMatchName.set(input.value);
  }

  // Event handler for gamertag input
  onGamertagInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.newMatchGamertag.set(input.value);
  }

  // Event handler for about input
  onAboutInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.newMatchAbout.set(input.value);
  }

  // Method to add a new match via the service
  onAddMatch(): void {
    const name = this.newMatchName();
    const gamertag = this.newMatchGamertag();
    const about = this.newMatchAbout();

    if (name.trim() && gamertag.trim()) {
      this.matchService.addMatch(name, gamertag, about);
      
      // Clear the form
      this.newMatchName.set('');
      this.newMatchGamertag.set('');
      this.newMatchAbout.set('');
    }
  }
  ;
}
