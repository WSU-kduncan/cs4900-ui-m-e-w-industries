import { inject, Injectable, Input, signal, WritableSignal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { ApiService } from "./ApiService.service";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  gamertag: string;
  preferredConsole?: number;
  aboutUser?: string;
  gameIds?: number[];
}

export interface AddUserRequest {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  gamertag: string;
  preferredConsole: string;
  aboutUser?: string;
  gameIds?: number[];
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {}

  // users: Array< User > = [
  //   { id: 1, firstName: 'Alice', lastName: 'Smith', dob: '1990-01-01', email: 'alice@example.com', gamertag: 'AliceGamer', preferredConsole: 'Xbox' },
  //   { id: 2, firstName: 'Bob', lastName: 'Brown', dob: '1985-05-15', email: 'bob@example.com', gamertag: 'Bobster', preferredConsole: 'PlayStation' },
  //   { id: 3, firstName: 'Charlie', lastName: 'Davis', dob: '1992-07-20', email: 'charlie@example.com', gamertag: 'CharD', preferredConsole: 'Nintendo' },
  //   { id: 4, firstName: 'Diana', lastName: 'Evans', dob: '1988-03-10', email: 'diana@example.com', gamertag: 'DiEvans', preferredConsole: 'PC' },
  //   { id: 5, firstName: 'Evan', lastName: 'Foster', dob: '1995-12-25', email: 'evan@example.com', gamertag: 'EvanF', preferredConsole: 'Xbox' },
  // ];

  UserCards : WritableSignal<User[]> = signal<User[]>([]);
  private ApiService: ApiService = inject(ApiService);

  private _userFromBackend = signal<User | null>(null);
  public readonly userFromBackend = this._userFromBackend.asReadonly();

  getUsersFromBackend(): void {
    this.ApiService.get().subscribe({
      next: (data) => {
        // console.log('raw response:', data); 
        // console.log('isArray:', Array.isArray(data)); 
        // console.log('typeof:', typeof data); 
        // console.log('Object.prototype.toString:', Object.prototype.toString.call(data)); 
        // console.log('keys:', Object.keys(data));
        console.log('User data retrieved from backend:', data);
        this.UserCards.set(data);
      },
      error: (error) => {
        console.error('Error fetching user data from backend:', error);
      }
    });
  }

  addUser(request: AddUserRequest): Observable<User> {
    
    return this.ApiService.post(request).pipe(
      map(response => {
        console.log('User added successfully:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error adding user:', error);
        throw error;
      })
    );
  }

  // getUsers() {
  //   return this.users;
  // }
}