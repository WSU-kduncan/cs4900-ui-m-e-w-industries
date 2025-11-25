import { Injectable, Input, signal, WritableSignal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { Game } from "./GameService.service";

@Injectable({
  providedIn: 'root'
})

export class GameApiService {
    constructor(private http: HttpClient) {}

    get(): Observable<Game[]> {
        return this.http.get<Game[]>('/GamerMatch/games')
        .pipe(
            map(response => {
                return [...response];
            })
        );
    }
}