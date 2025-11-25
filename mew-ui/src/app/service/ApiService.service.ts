import { Injectable, Input, signal, WritableSignal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { AddUserRequest, UpdateUserRequest, User } from "./UserService.service";

export interface UserApiResponse {
  users: User[];
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) {}

  get(): Observable<User[]> {
    return this.http.get<User[]>('/GamerMatch/users')
    .pipe(
      map(response => {
        return [...response];
      }
      )
    );
  }

  post(request: AddUserRequest): Observable<User> {
    return this.http.post<User>('/GamerMatch/users', request)
    .pipe(
      map(response => {
        console.log('User added successfully:', response);
        return response;
      })
    );
  }

  put(userId: number, request: UpdateUserRequest): Observable<User> {
    return this.http.put<User>(`/GamerMatch/users/id/${userId}`, request)
    .pipe(
      map(response => {
        console.log('User updated successfully:', response);
        return response;
      })
    );
  }
}