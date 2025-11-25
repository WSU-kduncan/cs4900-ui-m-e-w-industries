import { Injectable, Input, signal, WritableSignal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { AddUserRequest, User } from "./UserService.service";

export interface UserApiResponse {
  users: User[];
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) {}

  get(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/GamerMatch/users')
    .pipe(
      map(response => {
        return [...response];
      }
      )
    );
  }

  post(request: AddUserRequest): Observable<any> {
    return this.http.post<any>('http://localhost:8080/GamerMatch/users', request)
    .pipe(
      map(response => {
        return response;
      }
      )
    );
  }

}