import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  adminLoginForm: FormGroup;
  apiUrl: string = 'http://localhost:3000/admin';  // Admin credentials API

  constructor(private http: HttpClient, private router: Router) {
    // Initialize the admin login form with validation
    this.adminLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  // Submit form to login admin
  onSubmit() {
    if (this.adminLoginForm.valid) {
      const { email, password } = this.adminLoginForm.value;
      this.adminLogin(email, password);
    } else {
      alert('Please enter valid credentials.');
    }
  }

  // Admin login method
  adminLogin(email: string, password: string): void {
    this.http.get<any>(`${this.apiUrl}`).subscribe(admin => {
      if (admin.email === email && admin.password === password) {
        alert('Admin login successful!');
        localStorage.setItem('admin', JSON.stringify(admin));  // Store admin data in localStorage
        this.router.navigate(['/admin-dashboard']);  // Redirect to admin dashboard after login
      } else {
        alert('Invalid admin credentials.');
      }
    }, error => {
      console.error('Error fetching admin data:', error);
      alert('An error occurred. Please try again later.');
    });
  }

  // Helper getters for form validation
  get email() { return this.adminLoginForm.get('email'); }
  get password() { return this.adminLoginForm.get('password'); }
}
