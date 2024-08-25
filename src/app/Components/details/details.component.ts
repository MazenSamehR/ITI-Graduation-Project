import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
// import { userId } from '../signup/signup.component';
import { AddtocartService } from '../../Services/addtocart.service';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  PC: string = './imgs/imac.png';
  PlayStation: string = './imgs/playstation.png';
  Xbox: string = './imgs/game.png';
  IOS: string = './imgs/apple.png';
  Android: string = './imgs/android.png';
  Nintendo: string = './imgs/nintendo-switch (1).png';
  Linux: string = './imgs/linux.png';
  Web: string = './imgs/web.png';
  AppleMachine: string = './imgs/macintosh.png';

  game!: any;
  id!: number;

  constructor(
    private product: ProductService,
    private route: ActivatedRoute,
    private cart: AddtocartService,
    private router: Router
  ) {}

  data!: { userid: any; game: any };
  userName: any = localStorage.getItem('userName');
  userId: any = localStorage.getItem('userId');

  alert: boolean = false;
  added: boolean = false;
  gamePush!: any;

  addToCart(gameDetalis: any) {
    this.gamePush = {
      id: gameDetalis.id,
      name: gameDetalis.name,
      price: gameDetalis.price,
      image: gameDetalis.background_image,
      Quantity: gameDetalis.rating_top,
    };
    if (typeof this.userName !== 'string') {
      this.alert = true;
    } else {
      this.data = {
        userid: this.userId,
        game: this.gamePush,
      };
      this.cart.addToCartReq(this.data).subscribe((res) => {
        console.log(res);
        if (res.userid == this.userId) {
          this.added = true;
          setTimeout(() => {
            this.added = false;
          }, 2000);
        }
      });
    }
  }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.product.getDetails(this.id).subscribe((res) => {
      if (res.data.description_raw.length > 200) {
        res.data.description_raw = res.data.description_raw.slice(0, 1000);
      }
      this.game = res.data;
      console.log(this.game);
    });
  }
}
