import { Injectable, Input, signal, WritableSignal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) {}

  get(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/GamerMatch/users')
    .pipe(
      map(Response => {
        return {
          ...Response
        }
      }
      )
    );
  }
}