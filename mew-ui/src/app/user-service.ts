import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


export interface ApiUser {
  userId: number;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  gamertag: string;
  consoleId: number;
  aboutUser: string | null;
  gameIds: number[];
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
 getRemoteUsers(): Observable<ApiUser[]> {
  return this.http.get<ApiUser[]>('http://localhost:8080/GamerMatch/users').pipe(
    
  );
}

}
