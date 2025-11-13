import { Injectable, Input } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  @Input() users: Array<{ id: number; name: string }> = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'Diana' },
    { id: 5, name: 'Evan' },
  ];

  addUser(user: { id: number; name: string }) {
    this.users.push(user);
  }

  getUsers() {
    return this.users;
  }
}