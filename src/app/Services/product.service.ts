import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiKey = '8a407f442a9749e1853ec8449e8b8991';

  constructor(private http: HttpClient) {}

  getDetails(id: number): Observable<any> {
    return this.http.get<any>(`https://backend-c0jl0hova-marko-samis-projects.vercel.app/games/${id}`);
  }
}
