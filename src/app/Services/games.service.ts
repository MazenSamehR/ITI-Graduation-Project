import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
export interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string;
  // Add other properties as needed
}

export interface GamesApiResponse {
  results: Game[];
  // Add other properties if needed, like 'count', 'next', 'previous', etc.
}
  
@Injectable({
  providedIn: 'root',
})
export class GamesService {
  apiKey = '8a407f442a9749e1853ec8449e8b8991';
  private searchResultsSource = new BehaviorSubject<Game[]>([]);
  searchResults$ = this.searchResultsSource.asObservable();

  constructor(private http: HttpClient) {}

  getAllGames(): Observable<GamesApiResponse> {
    return this.http.get<GamesApiResponse>(
      `https://api.rawg.io/api/games?key=${this.apiKey}`
    );
  }

  searchGames(query: string): Observable<GamesApiResponse> {
    return this.http
      .get<GamesApiResponse>(
        `https://api.rawg.io/api/games?key=${this.apiKey}&search=${query}`
      )
      .pipe(
        tap((data) => {
          this.searchResultsSource.next(data.results); // Update the search results
        })
      );
  }
}
