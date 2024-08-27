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
  private searchResultsSource = new BehaviorSubject([]);
  searchResults$ = this.searchResultsSource.asObservable();

  constructor(private http: HttpClient) {}

  getAllGames(): Observable<any> {
    return this.http.get<GamesApiResponse>(`https://backend-c0jl0hova-marko-samis-projects.vercel.app/games`);
  }

  searchGames(query: string): Observable<any> {
    return this.http
      .get<any>(`https://backend-c0jl0hova-marko-samis-projects.vercel.app/searchgames?name=${query}`)
      .pipe(
        tap((data) => {
          this.searchResultsSource.next(data); // Update the search results
        })
      );
  }
}
