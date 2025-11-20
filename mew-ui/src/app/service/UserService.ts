import { Injectable, Input, signal, WritableSignal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  gamertag: string;
  preferredConsole: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) {}

  users: Array< User > = [
    { id: 1, firstName: 'Alice', lastName: 'Smith', dob: '1990-01-01', email: 'alice@example.com', gamertag: 'AliceGamer', preferredConsole: 'Xbox' },
    { id: 2, firstName: 'Bob', lastName: 'Brown', dob: '1985-05-15', email: 'bob@example.com', gamertag: 'Bobster', preferredConsole: 'PlayStation' },
    { id: 3, firstName: 'Charlie', lastName: 'Davis', dob: '1992-07-20', email: 'charlie@example.com', gamertag: 'CharD', preferredConsole: 'Nintendo' },
    { id: 4, firstName: 'Diana', lastName: 'Evans', dob: '1988-03-10', email: 'diana@example.com', gamertag: 'DiEvans', preferredConsole: 'PC' },
    { id: 5, firstName: 'Evan', lastName: 'Foster', dob: '1995-12-25', email: 'evan@example.com', gamertag: 'EvanF', preferredConsole: 'Xbox' },
  ];

  UserCards : WritableSignal<User[]> = signal<User[]>(this.users);

  get<User>(): Observable<User[]> {
    return this.http.get<User[]>('https://api.example.com/users');
  }

  addUser(user: { id: number; firstName: string; lastName: string; dob: string; email: string; gamertag: string; preferredConsole: string }) {
    this.users.push(user);
  }

  getUsers() {
    return this.users;
  }
}