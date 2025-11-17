import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from '../user-service';
import { UserDetail } from '../user-detail/user-detail';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, UserDetail],
  templateUrl: './user-table.html',
  styleUrls: ['./user-table.scss'],
})
export class UserTable {

  constructor(public userService: UserService) {}

  
  firstName = signal('');
  lastName = signal('');
  dob = signal('');
  email = signal('');
  gamertag = signal('');
  preferredConsole = signal(1);
  about = signal('');

  ngOnInit() {
    this.userService.setInitialUsers([
      {
        id: 1,
        firstName: 'Aisha',
        lastName: 'Khan',
        dob: '1999-05-12',
        email: 'aisha.khan@example.com',
        gamertag: 'ShadowAisha',
        preferredConsole: 3,
        about: 'Enjoys cozy farming sims and JRPGs.',
      },
      {
        id: 2,
        firstName: 'Marcus',
        lastName: 'Lee',
        dob: '2001-11-02',
        email: 'marcus.lee@example.com',
        gamertag: 'MLeePro',
        preferredConsole: 2,
        about: 'Competitive FPS player; volunteers as scrim coach.',
      },
      {
        id: 3,
        firstName: 'Priya',
        lastName: 'Patel',
        dob: '1998-01-23',
        email: 'priya.patel@example.com',
        gamertag: 'PriyaPlays',
        preferredConsole: 1,
        about: 'Indie game enthusiast; speedruns platformers.',
      },
     
    ]);
  }

  addUser() {
    const fn = this.firstName().trim();
    if (!fn) return;

    const newUser: User = {
      id: Math.floor(Math.random() * 100000),
      firstName: fn,
      lastName: this.lastName(),
      dob: this.dob() || new Date(),
      email: this.email(),
      gamertag: this.gamertag(),
      preferredConsole: Number(this.preferredConsole()),
      about: this.about(),
    };

    this.userService.addUser(newUser);

    
    this.firstName.set('');
    this.lastName.set('');
    this.dob.set('');
    this.email.set('');
    this.gamertag.set('');
    this.preferredConsole.set(1);
    this.about.set('');
  }
}
