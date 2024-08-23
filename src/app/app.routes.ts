import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ProductListComponent } from './Components/product-list/product-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductListComponent
  },
//   {
//     path: 'products/:id',
//     component: ProductDetailsComponen
//   },
  {
    path: '**',
    redirectTo: ''
  }
];
