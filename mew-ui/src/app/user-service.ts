import { Injectable, signal } from '@angular/core';

export type User = {
  id: number;
  firstName: string;
  lastName?: string;
  dob: string | Date;
  email: string;
  gamertag: string;
  preferredConsole: number;
  about?: string;
};

@Injectable({
  providedIn: 'root',
})
export class UserService {

  // Signal that stores ALL user data
  users = signal<User[]>([]);

  // Load initial data
  setInitialUsers(users: User[]) {
    this.users.set(users);
  }

  // Add a new user
  addUser(user: User) {
    this.users.update(list => [...list, user]);
  }
}
