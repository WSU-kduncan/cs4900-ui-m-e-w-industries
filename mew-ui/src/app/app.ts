import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserTable } from './user-table/user-table';   

@Component({
  selector: 'app-root',
  standalone: true,                 
  imports: [RouterOutlet, UserTable],   
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],          
})
export class App {
  protected readonly title = signal('mew-ui');
}
