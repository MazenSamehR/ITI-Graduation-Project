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
    return this.http.get<any>(`http://localhost:8008/games/${id}`);
  }
}
