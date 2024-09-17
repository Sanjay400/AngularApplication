import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  apiUrl: string = 'http://localhost:5000';

  constructor(private http: HttpClient, private router: Router) {
    // Initialize form group with validation rules
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  // This method is called when the form is submitted
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginUser(email, password);
    } else {
      alert('Please fill in the form correctly');
    }
  }

  // Helper method to check if user exists and then redirect to cart
  loginUser(email: string, password: string): void {
    this.http.get<any[]>(`${this.apiUrl}/users?email=${email}&password=${password}`).subscribe(users => {
      if (users.length > 0) {
        const user = users[0];
        localStorage.setItem('userId', user.id.toString());
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Login successful! Redirecting to cart...');
        this.router.navigate(['']); // Navigate to the cart page
      } else {
        alert('Invalid credentials');
      }
    }, error => {
      console.error('Error fetching users:', error);
      alert('An error occurred. Please try again later.');
    });
  }

  // Helper getters for validation error messages
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
