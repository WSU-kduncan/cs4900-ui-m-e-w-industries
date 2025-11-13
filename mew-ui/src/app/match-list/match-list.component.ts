import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-match-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-list.component.html',
  styleUrl: './match-list.component.css'
})
export class MatchListComponent {
  matches = [
    { 
      id: 1, 
      name: 'Liked_User1',
      gamertag: 'ProGamer2024',
      aboutUser: 'Love RPGs and competitive shooters!'
    },
    { 
      id: 2, 
      name: 'Liked_User2',
      gamertag: 'NightOwlGaming',
      aboutUser: 'Late night gaming sessions are my thing.'
    },
    { 
      id: 3, 
      name: 'Liked_User3',
      gamertag: 'StrategyMaster',
      aboutUser: 'Strategy games enthusiast, let\'s team up!'
    },
    { 
      id: 4, 
      name: 'Liked_User4',
      gamertag: 'CasualPlayer99',
      aboutUser: 'Just here to have fun and make friends.'
    }
  ];
}
