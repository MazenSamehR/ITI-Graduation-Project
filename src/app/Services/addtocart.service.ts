import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AddtocartService {
  constructor(private http: HttpClient) {}

  addToCartReq(data: any): Observable<any> {
    return this.http.post<any>(
      "https://backend-c0jl0hova-marko-samis-projects.vercel.app/add-game",
      data
    );
  }
  getCart(userId: any) {
    return this.http.get<any>(
      `https://backend-c0jl0hova-marko-samis-projects.vercel.app/cart/${userId}/games`
    );
  }
  deleteFromCart(data: any): Observable<any> {
    console.log(data);
    return this.http.delete<any>(
      "https://backend-c0jl0hova-marko-samis-projects.vercel.app/remove-game",
      data
    );
  }
}
