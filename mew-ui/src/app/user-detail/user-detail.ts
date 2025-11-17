import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user-service';

const CONSOLE_LABELS: Record<number, string> = {
  1: 'Play Station',
  2: 'Xbox',
  3: 'Nintendo Switch',
  4: 'PC',
  5: 'Mobile',
};

@Component({
  selector: 'user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.html',
  styleUrls: ['./user-detail.scss'],
})
export class UserDetail {
  // Required signal input from parent
  item = input.required<User>();

  consoleLabel(code: number): string {
    return CONSOLE_LABELS[code] ?? `Unknown (${code})`;
  }
}
