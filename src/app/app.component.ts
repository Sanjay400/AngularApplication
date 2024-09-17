import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RouterLink,ProductComponent,HttpClientModule,LoginComponent,SignUpComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // corrected styleUrl to styleUrls
})
export class AppComponent {
  title = 'myapp';
}
