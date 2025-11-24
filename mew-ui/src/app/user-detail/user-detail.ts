import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiUser } from '../user-service';

@Component({
  selector: 'user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.html',
  styleUrls: ['./user-detail.scss'],
})
export class UserDetail {

  // Accepts API user now (NOT local User model)
  item = input.required<ApiUser>();

  consoleLabel(id: number): string {
    return {
      1: 'PlayStation',
      2: 'Xbox',
      3: 'Nintendo Switch',
      4: 'PC',
      5: 'Mobile'
    }[id] ?? `Unknown (${id})`;
  }
}
