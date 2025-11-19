import { Component, input } from '@angular/core';
import { Match } from '../services/match.service';

@Component({
  selector: 'app-match-detail',
  standalone: true,
  imports: [],
  templateUrl: './match-detail.component.html',
  styleUrl: './match-detail.component.css'
})
export class MatchDetailComponent {
  // Required signal input to accept a Match object
  match = input.required<Match>();
}
