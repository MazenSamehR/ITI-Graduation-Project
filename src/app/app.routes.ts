import { Routes } from '@angular/router';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { DetailsComponent } from './Components/details/details.component';
import { CartComponent } from './Components/cart/cart.component';
import { LandingComponent } from './Components/landing/landing.component';
import { SignupComponent } from './Components/signup/signup.component';
import { LoginComponent } from './Components/login/login.component';

export const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  // { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'games', component: ProductListComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
];
