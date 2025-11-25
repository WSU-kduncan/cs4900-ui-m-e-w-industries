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
  consoleId?: number;
  aboutUser?: string;
  gameIds?: number[];
}

export interface AddUserRequest {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  gamertag: string;
  consoleId: number;
  aboutUser?: string;
  gameIds?: number[];
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  gamertag?: string;
  consoleId?: number;
  aboutUser?: string;
  gameIds?: number[];
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {}

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

  updateUser(id: number, request: UpdateUserRequest): Observable<User> {
  
    return this.ApiService.put(id, request).pipe(
      map(response => {
        console.log('User updated successfully:', response);
        return response;
      }),
      catchError(error => {
        console.error('Error updating user:', error);
        throw error;
      })
    );
  }
}