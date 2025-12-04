import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatchService, User } from '../services/match.service';
import { MatchDetailComponent } from '../match-detail/match-detail.component';

@Component({
  selector: 'app-match-list',
  standalone: true,
  imports: [CommonModule, MatchDetailComponent, RouterLink],
  templateUrl: './match-list.component.html',
  styleUrl: './match-list.component.css'
})
export class MatchListComponent implements OnInit {
  // Inject the MatchService
  private matchService = inject(MatchService);

  // Expose the matches signal from the service
  matches = this.matchService.matches;

  // Convert Observable to Signal for API users
  users = toSignal(this.matchService.getUsers(), { initialValue: [] as User[] });

  // Signal to track loading state
  isLoading = signal(false);

  ngOnInit(): void {
    console.log('MatchListComponent initialized');
    // Fetch matches on component initialization
    this.refreshMatches();
  }

  // Refresh the matches list from the server
  refreshMatches(): void {
    console.log('Refreshing matches...');
    this.isLoading.set(true);
    this.matchService.getAllMatches().subscribe({
      next: (users) => {
        console.log('Matches refreshed successfully:', users);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching matches:', error);
        this.isLoading.set(false);
        alert('Error loading matches. Please try again.');
      }
    });
  }

  // Delete a match
  onDeleteMatch(id: number, name: string): void {
    console.log('Delete button clicked for:', id, name);
    
    const confirmed = confirm(`Are you sure you want to delete "${name}"?`);
    console.log('User confirmed:', confirmed);
    
    if (confirmed) {
      console.log('Deleting match...');
      this.matchService.deleteMatch(id).subscribe({
        next: (response) => {
          console.log('Delete successful:', response);
          alert(`"${name}" deleted successfully!`);
          // The signal is already updated in the service, no need to refresh
        },
        error: (error) => {
          console.error('Error deleting match:', error);
          // Even on error, the local state is updated
          alert(`"${name}" deleted (saved locally).`);
        }
      });
    }
  }

  // Clear all matches (for testing)
  clearAllMatches(): void {
    if (confirm('Are you sure you want to clear all matches?')) {
      this.matchService.clearMatches();
      alert('All matches cleared!');
    }
  }
}
