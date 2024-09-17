import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';

import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { OrderHistoryComponent } from './order-history/order-history.component';


export const routes: Routes = [
    {path:'',component: ProductComponent},
    
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'cart', component: CartComponent },
  {path:'shopping', component: ShoppingComponent},
  {path:'orderhistory',component: OrderHistoryComponent},
  { path: '**', redirectTo: '' } // Wildcard route for 404 or redirect to home
   
];

