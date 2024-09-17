import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterOutlet,LoginComponent,SignUpComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  onLogout(): void {
    this.authService.logout();
  }
}
