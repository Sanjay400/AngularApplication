import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  constructor(private router: Router) {}

  // Logout function
  logout() {
    // Clear any stored user authentication tokens (if any)
    localStorage.removeItem('adminToken'); // Example if you store admin login data in localStorage
    this.router.navigate(['/admin-login']); // Navigate back to the admin login page
  }

  // Navigate to Manage Users Page
  navigateToManageUsers() {
    this.router.navigate(['/manage-users']); // Assuming you have a route for managing users
  }

  navigateToManageProducts() {
    this.router.navigate(['/manage-products']);
  }
}
