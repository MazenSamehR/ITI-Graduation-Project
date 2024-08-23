import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  apiKey = "8a407f442a9749e1853ec8449e8b8991";
  constructor(private http: HttpClient) { }

  getAllGames(): Observable<any> {
    return this.http.get(
      `https://api.rawg.io/api/games?key=${this.apiKey}`
    )
  }
}
