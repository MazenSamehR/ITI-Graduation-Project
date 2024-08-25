import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  loginReq(user: any): Observable<any> {
    return this.http.post<any>('http://localhost:8008/login', user);
  }
  registerReq(user: any): Observable<any> {
    return this.http.post<any>('http://localhost:8008/signup', user);
  }
}
