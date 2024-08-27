import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  loginReq(user: any): Observable<any> {
    return this.http.post<any>('https://backend-c0jl0hova-marko-samis-projects.vercel.app/login', user);
  }
  registerReq(user: any): Observable<any> {
    return this.http.post<any>('https://backend-c0jl0hova-marko-samis-projects.vercel.app/signup', user);
  }
}
