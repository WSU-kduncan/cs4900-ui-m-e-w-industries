import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';

// TypeScript interface defining the shape of API data
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
}

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
  // Inject HttpClient
  private http = inject(HttpClient);

  // API base URL - using JSONPlaceholder for demonstration
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  // Writable signal to hold the array of matches
  private matchesSignal = signal<Match[]>([]);

  // Expose the signal as readonly
  readonly matches = this.matchesSignal.asReadonly();

  // READ: Method that uses HttpClient to fetch data from API
  // Returns an Observable of User array
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // READ: Fetch all matches from the server
  getAllMatches(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap((users) => {
        // Convert API users to Match format and update signal
        const matches: Match[] = users.map(user => ({
          id: user.id,
          name: user.name,
          gamertag: user.username,
          aboutUser: user.email
        }));
        this.matchesSignal.set(matches);
        console.log('Matches loaded:', matches);
      }),
      catchError(error => {
        console.error('Error fetching matches:', error);
        return of([]);
      })
    );
  }

  // CREATE: Post a new match to the server
  createMatch(match: Omit<Match, 'id'>): Observable<any> {
    console.log('Creating match:', match);
    return this.http.post<any>(this.apiUrl, match).pipe(
      tap((response) => {
        console.log('Create response:', response);
        // JSONPlaceholder returns a fake ID, but we'll generate our own
        const newMatch: Match = {
          id: response.id || Date.now(), // Use timestamp as unique ID
          name: match.name,
          gamertag: match.gamertag,
          aboutUser: match.aboutUser
        };
        // Add the new match to the local signal
        this.matchesSignal.update(matches => [...matches, newMatch]);
        console.log('Match created successfully:', newMatch);
      }),
      catchError(error => {
        console.error('Error creating match:', error);
        // Even if API fails, add locally for demo purposes
        const newMatch: Match = {
          id: Date.now(),
          name: match.name,
          gamertag: match.gamertag,
          aboutUser: match.aboutUser
        };
        this.matchesSignal.update(matches => [...matches, newMatch]);
        return of(newMatch);
      })
    );
  }

  // UPDATE: Update an existing match on the server
  updateMatch(match: Match): Observable<Match> {
    console.log('Updating match:', match);
    return this.http.put<Match>(`${this.apiUrl}/${match.id}`, match).pipe(
      tap((response) => {
        console.log('Update response:', response);
        // Update the match in the local signal
        this.matchesSignal.update(matches =>
          matches.map(m => m.id === match.id ? match : m)
        );
        console.log('Match updated successfully');
      }),
      catchError(error => {
        console.error('Error updating match:', error);
        // Update locally even if API fails
        this.matchesSignal.update(matches =>
          matches.map(m => m.id === match.id ? match : m)
        );
        return of(match);
      })
    );
  }

  // DELETE: Delete a match from the server
  deleteMatch(id: number): Observable<any> {
    console.log('Deleting match with id:', id);
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap((response) => {
        console.log('Delete response:', response);
        // Remove the match from the local signal
        this.matchesSignal.update(matches => matches.filter(m => m.id !== id));
        console.log('Match deleted successfully');
      }),
      catchError(error => {
        console.error('Error deleting match:', error);
        // Delete locally even if API fails
        this.matchesSignal.update(matches => matches.filter(m => m.id !== id));
        return of({ success: true });
      })
    );
  }

  // Local method to add a match (for backward compatibility)
  addMatch(name: string, gamertag: string, aboutUser: string = ''): void {
    if (!name.trim() || !gamertag.trim()) {
      return;
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
      : Date.now();
  }

  // Method to get a single match by ID
  getMatchById(id: number): Match | undefined {
    return this.matchesSignal().find(m => m.id === id);
  }

  // Method to clear all matches (useful for testing)
  clearMatches(): void {
    this.matchesSignal.set([]);
  }
}
