import { Injectable, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {}

  @Input() users: Array<{ id: number; name: string }> = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'Diana' },
    { id: 5, name: 'Evan' },
  ];

  get<User>(): Observable<User[]> {
    return this.http.get<User[]>('https://api.example.com/users');
  }

  addUser(user: { id: number; name: string }) {
    this.users.push(user);
  }

  getUsers() {
    return this.users;
  }
}