import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedInUserName: string = '';
  isAdminPage: boolean = false; // To track if the user is on admin pages

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the logged-in user's name from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    if (loggedInUser && loggedInUser.name) {
      this.loggedInUserName = loggedInUser.name;
    }

    // Check if the current route is either admin-login or admin-dashboard
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;
      this.isAdminPage = currentUrl === '/admin-login' || currentUrl === '/admin-dashboard';
    });
  }

  onLogout(): void {
    this.authService.logout();
    this.loggedInUserName = '';  // Reset the username
    this.router.navigate(['/login']);  // Redirect to login after logout
  }
}
