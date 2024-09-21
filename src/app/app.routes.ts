import { Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';

import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';


export const routes: Routes = [
    {path:'',component: ProductComponent},
    
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'cart', component: CartComponent },
  {path:'shopping', component: ShoppingComponent},
  {path:'orderhistory',component: OrderHistoryComponent},
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent},
  { path: 'manage-users', component: ManageUsersComponent },
  { path: 'edit-user/:id', component: EditUserComponent },
  { path: '**', redirectTo: '' } // Wildcard route for 404 or redirect to home
   
];

