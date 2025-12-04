import { Routes } from '@angular/router';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchFormComponent } from './match-form/match-form.component';

export const routes: Routes = [
  { path: '', component: MatchListComponent },
  { path: 'create', component: MatchFormComponent },
  { path: 'edit/:id', component: MatchFormComponent },
  { path: '**', redirectTo: '' }
];
