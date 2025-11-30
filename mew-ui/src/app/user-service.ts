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



export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  dob: string;      
  email: string;
  gamertag: string;
  consoleId: number;
  aboutUser: string;
  gameIds: number[];
}


@Injectable({
  providedIn: 'root',
})
export class UserService {


  private baseUrl = 'http://localhost:8080/GamerMatch';

  constructor(private http: HttpClient) {}
 getRemoteUsers(): Observable<ApiUser[]> {
  return this.http.get<ApiUser[]>('http://localhost:8080/GamerMatch/users').pipe(
    
  );
}


createUser(user: CreateUserRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, user);
  }
deleteUser(id: number) {
  return this.http.delete<void>(`${this.baseUrl}/users/id/${id}`);
}


}
