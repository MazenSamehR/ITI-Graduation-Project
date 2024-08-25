import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddtocartService {
  constructor(private http: HttpClient) {}

  addToCartReq(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:8008/add-game', data);
  }
  getCart(userId: any) {
    return this.http.get<any>(`http://localhost:8008/cart/${userId}/games`);
  }
  deleteFromCart(data: any): Observable<any> {
    console.log(data);
    return this.http.delete<any>('http://localhost:8008/remove-game', data);
  }
}
