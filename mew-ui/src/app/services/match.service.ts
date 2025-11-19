import { Injectable, signal } from '@angular/core';

export interface Match {
  id: number;
  name: string;
  gamertag: string;
  aboutUser: string;
}

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  // Writable signal to hold the array of matches
  private matchesSignal = signal<Match[]>([
    { 
      id: 1, 
      name: 'Liked_User1',
      gamertag: 'ProGamer2024',
      aboutUser: 'Love RPGs and competitive shooters!'
    },
    { 
      id: 2, 
      name: 'Liked_User2',
      gamertag: 'NightOwlGaming',
      aboutUser: 'Late night gaming sessions are my thing.'
    },
    { 
      id: 3, 
      name: 'Liked_User3',
      gamertag: 'StrategyMaster',
      aboutUser: 'Strategy games enthusiast, let\'s team up!'
    },
    { 
      id: 4, 
      name: 'Liked_User4',
      gamertag: 'CasualPlayer99',
      aboutUser: 'Just here to have fun and make friends.'
    }
  ]);

  // Expose the signal as readonly
  readonly matches = this.matchesSignal.asReadonly();

  // Method to add a new match
  addMatch(name: string, gamertag: string, aboutUser: string = ''): void {
    if (!name.trim() || !gamertag.trim()) {
      return; // Don't add empty matches
    }

    const newMatch: Match = {
      id: this.generateId(),
      name: name.trim(),
      gamertag: gamertag.trim(),
      aboutUser: aboutUser.trim()
    };

    this.matchesSignal.update(matches => [...matches, newMatch]);
  }

  // Helper method to generate unique IDs
  private generateId(): number {
    const currentMatches = this.matchesSignal();
    return currentMatches.length > 0 
      ? Math.max(...currentMatches.map(m => m.id)) + 1 
      : 1;
  }

  // Optional: Method to remove a match
  removeMatch(id: number): void {
    this.matchesSignal.update(matches => matches.filter(m => m.id !== id));
  }
}
