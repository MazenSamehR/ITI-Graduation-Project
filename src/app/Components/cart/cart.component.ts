import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { GamesService } from '../../Services/games.service';
import { Router, RouterModule } from '@angular/router';
import { AddtocartService } from '../../Services/addtocart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  games!: any;
  totalPrice: number = 0;

  userName: any = localStorage.getItem('userName');
  userId: any = localStorage.getItem('userId');

  constructor(private cart: AddtocartService, private router: Router) {}

  data!: { body: { userid: any; gameid: any } };

  removed: boolean = false;

  deleteGame(game: any) {
    this.data = { body: { userid: this.userId, gameid: game.id } };
    console.log(this.data);
    this.cart.deleteFromCart(this.data).subscribe((res) => {
      console.log(res);
      if (res.message == 'Game removed successfully') {
        window.location.reload();
      }
    });
  }

  ngOnInit() {
    this.cart.getCart(this.userId).subscribe((res) => {
      this.games = res;
      for (let i = 0; i < res.length; i++) {
        this.totalPrice += res[i].price;
        this.totalPrice.toFixed(3);
      }
      console.log(res);
    });
  }
}
