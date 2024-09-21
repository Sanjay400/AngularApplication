import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; // Ensure to import your AuthService

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  constructor(private router: Router, private authService: AuthService) {}

  // Navigate to the Manage Users page
  manageUsers() {
    this.router.navigate(['/manage-users']); // Update with your actual route
  }

  // Logout function
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
