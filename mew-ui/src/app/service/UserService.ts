import { Injectable, Input, signal, WritableSignal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

export interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {}

  users: Array< User > = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'Diana' },
    { id: 5, name: 'Evan' },
  ];

  UserCards : WritableSignal<User[]> = signal<User[]>(this.users);

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