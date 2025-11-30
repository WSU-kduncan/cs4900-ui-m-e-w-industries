import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService, ApiUser } from '../user-service';
import { UserDetail } from '../user-detail/user-detail';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, UserDetail],
  templateUrl: './user-table.html',
  styleUrls: ['./user-table.scss'],
})
export class UserTable {
  // 👇 writable signal that holds the users
  remoteUsers = signal<ApiUser[]>([]);

  constructor(public userService: UserService) {
    this.loadRemoteUsers(); // initial load
  }

  // 👇 single place to call the GET and update the signal
  private loadRemoteUsers(): void {
    this.userService.getRemoteUsers().subscribe({
      next: (users: ApiUser[]) => {
        console.log('Loaded users:', users);
        this.remoteUsers.set(users);
      },
      error: (err: any) => {
        console.error('Failed to load users', err);
        this.remoteUsers.set([]);
      },
    });
  }

  // 👇 called from app.html: userTable.reload()
  reload(): void {
    console.log('reload() called');
    this.loadRemoteUsers();
  }
}
