import { Component, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

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

  
  remoteUsers!: Signal<ApiUser[]>;

  constructor(public userService: UserService) {
    // Convert Observable<ApiUser[]> → Signal<ApiUser[]>
    this.remoteUsers = toSignal(this.userService.getRemoteUsers(), {
      initialValue: [] as ApiUser[],
    });
  }

}
