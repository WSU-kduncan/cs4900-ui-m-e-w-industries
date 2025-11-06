import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type User = {
  id: number;
  firstName: string;
  lastName?: string;
  dob: string | Date;
  email: string;
  gamertag: string;
  preferredConsole: number; 
  about?: string;
};

const CONSOLE_LABELS: Record<number, string> = {
  1: 'Play Station',
  2: 'Xbox',
  3: 'Nintendo Switch',
  4: 'PC',
  5: 'Mobile',
};

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule],       
  templateUrl: './user-table.html',
  styleUrls: ['./user-table.scss'],
})
export class UserTable {
  users: User[] = [
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

    {
  id: 4,
  firstName: 'Diego',
  lastName: 'Martinez',
  dob: '2000-07-15',
  email: 'diego.martinez@example.com',
  gamertag: 'D1egoDash',
  preferredConsole: 4,
  about: 'PC tinkerer; loves modded RPGs and strategy games.',
},
{
  id: 5,
  firstName: 'Lena',
  lastName: 'Zhou',
  dob: '2002-02-28',
  email: 'lena.zhou@example.com',
  gamertag: 'NebulaLena',
  preferredConsole: 5,
  about: 'Mobile MOBA squads at night; social player.',
},
{
  id: 6,
  firstName: 'Omar',
  lastName: 'Hassan',
  dob: '1997-10-09',
  email: 'omar.hassan@example.com',
  gamertag: 'NightFalcon',
  preferredConsole: 2,
  about: 'Ranked shooter lobbies; team caller and strat notes.',
},
{
  id: 7,
  firstName: 'Emily',
  lastName: 'Johnson',
  dob: '1999-03-21',
  email: 'emily.johnson@example.com',
  gamertag: 'PixelEm',
  preferredConsole: 1,
  about: 'Story-rich adventures and trophy hunts.',
},
{
  id: 8,
  firstName: 'Ravi',
  lastName: 'Sharma',
  dob: '1998-12-05',
  email: 'ravi.sharma@example.com',
  gamertag: 'Rav1Byte',
  preferredConsole: 3,
  about: 'Co-op platformers; weekly speedrun practice.',
},
{
  id: 9,
  firstName: 'Sara',
  lastName: 'Ahmed',
  dob: '2001-06-30',
  email: 'sara.ahmed@example.com',
  gamertag: 'StarSara',
  preferredConsole: 4,
  about: 'Builds PCs; loves survival crafting with voice chat.',
},
{
  id: 10,
  firstName: 'Noah',
  lastName: 'Bennett',
  dob: '2000-01-11',
  email: 'noah.bennett@example.com',
  gamertag: 'BennettBeast',
  preferredConsole: 2,
  about: 'Weekend tournament queues; flexible roles.',
},
{
  id: 11,
  firstName: 'Maya',
  lastName: 'Singh',
  dob: '2003-04-18',
  email: 'maya.singh@example.com',
  gamertag: 'MayaMint',
  preferredConsole: 5,
  about: 'Casual evenings; puzzle and rhythm games.',
},
{
  id: 12,
  firstName: 'Kenji',
  lastName: 'Sato',
  dob: '1996-09-01',
  email: 'kenji.sato@example.com',
  gamertag: 'SatoBlade',
  preferredConsole: 1,
  about: 'Fighting games lab sessions; frame data nerd.',
},
{
  id: 13,
  firstName: 'Ava',
  lastName: 'Reed',
  dob: '1999-08-24',
  email: 'ava.reed@example.com',
  gamertag: 'AvaArc',
  preferredConsole: 3,
  about: 'Cozy co-op; loves farming and party games.',
},
{
  id: 14,
  firstName: 'Jamal',
  lastName: 'Brooks',
  dob: '1997-05-07',
  email: 'jamal.brooks@example.com',
  gamertag: 'BrooksMode',
  preferredConsole: 4,
  about: 'MMO raids; healer main with spreadsheets.',
},
{
  id: 15,
  firstName: 'Helena',
  lastName: 'Costa',
  dob: '1998-02-13',
  email: 'helena.costa@example.com',
  gamertag: 'CoastlineHC',
  preferredConsole: 1,
  about: 'JRPG collector; achievements completionist.',
},
{
  id: 16,
  firstName: 'Leo',
  lastName: 'Kowalski',
  dob: '2000-11-19',
  email: 'leo.kowalski@example.com',
  gamertag: 'PolarLeo',
  preferredConsole: 2,
  about: 'Late-night shooters; prefers small tactical squads.',
},
{
  id: 17,
  firstName: 'Nora',
  lastName: 'Petrova',
  dob: '1997-03-03',
  email: 'nora.petrova@example.com',
  gamertag: 'NovaNora',
  preferredConsole: 3,
  about: 'Party games + couch co-op on weekends.',
},
{
  id: 18,
  firstName: 'Yusuf',
  lastName: 'Khan',
  dob: '1995-07-27',
  email: 'yusuf.khan@example.com',
  gamertag: 'KhanQuest',
  preferredConsole: 4,
  about: 'Strategy campaigns and city builders with mods.',
},
{
  id: 19,
  firstName: 'Chloe',
  lastName: 'Nguyen',
  dob: '2002-12-12',
  email: 'chloe.nguyen@example.com',
  gamertag: 'ChloeChord',
  preferredConsole: 5,
  about: 'Rhythm game marathons; friendly and patient.',
},
{
  id: 20,
  firstName: 'Mateo',
  lastName: 'Rojas',
  dob: '1999-09-16',
  email: 'mateo.rojas@example.com',
  gamertag: 'R0jasRift',
  preferredConsole: 2,
  about: 'Esports VOD reviews; looking for duo queue.',
},
{
  id: 21,
  firstName: 'Isabella',
  lastName: 'Romano',
  dob: '2001-01-29',
  email: 'isabella.romano@example.com',
  gamertag: 'BellaBits',
  preferredConsole: 1,
  about: 'Action-adventure and photo mode connoisseur.',
},
{
  id: 22,
  firstName: 'Tariq',
  lastName: 'Mahmud',
  dob: '1996-06-02',
  email: 'tariq.mahmud@example.com',
  gamertag: 'TariqTactix',
  preferredConsole: 4,
  about: 'Co-op RTS nights; loves voice comms and planning.',
},
{
  id: 23,
  firstName: 'Zoe',
  lastName: 'Bauer',
  dob: '1998-04-04',
  email: 'zoe.bauer@example.com',
  gamertag: 'ZoeZoom',
  preferredConsole: 3,
  about: 'Platformers, party games, and local co-op.',
}



  ];

  consoleLabel(code: number): string {
    return CONSOLE_LABELS[code] ?? `Unknown (${code})`;
  }
}
