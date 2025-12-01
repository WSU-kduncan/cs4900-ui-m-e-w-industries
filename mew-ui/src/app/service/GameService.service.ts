import { inject, Injectable, Input, signal, WritableSignal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { GameApiService } from "./GameApiService.service";

export interface Game {
  id: number;
  title: string;
  isSinglePlayer: boolean;
  isMultiPlayer: boolean;
  genreId: number;
  userIds: number[];
}

@Injectable({
  providedIn: 'root'
})

export class GameService {
  constructor(private http: HttpClient) {}

  GameCards : WritableSignal<Game[]> = signal<Game[]>([]);
  private GameApiService: GameApiService = inject(GameApiService);

  private _gameFromBackend = signal<Game | null>(null);
  public readonly gameFromBackend = this._gameFromBackend.asReadonly();

  getGamesFromBackend(): void {
    this.GameApiService.get().subscribe({
      next: (data) => {
        console.log('Game data retrieved from backend:', data);
        this.GameCards.set(data);
      },
      error: (error) => {
        console.error('Error fetching game data from backend:', error);
      }
    });
  }

  getGameById(gameId: number): Observable<Game> {
    return this.GameApiService.getById(gameId).pipe(
      map((data: Game) => {
        console.log(`Game data for ID ${gameId} retrieved from backend:`, data);
        return data;
      }),
      catchError((error) => {
        console.error(`Error fetching game data for ID ${gameId} from backend:`, error);
        throw error;
      })
    );
  } 
}