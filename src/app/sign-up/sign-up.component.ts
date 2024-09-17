import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true, // Standalone component
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink, RouterOutlet], // Required imports for forms and routing
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm: FormGroup;

  constructor(private http: HttpClient, private router: Router) {
    // Initialize the form group with validation rules
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      phoneNo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')])
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const newUser = {
        ...this.signupForm.value,
        cart: [],  // Initialize empty cart
        orderhistory: []  // Initialize empty order history
      };

      // Fetch the list of users from the JSON server
      this.http.get<any[]>('http://localhost:5000/users').subscribe(users => {
        const userExists = users.find(user => user.email === newUser.email);

        // If user doesn't exist, proceed with signup
        if (!userExists) {
          this.http.post('http://localhost:5000/users', newUser).subscribe(() => {
            alert('Signup successful! Redirecting to login...');
            this.router.navigate(['/login']); // Navigate to login after successful signup
          });
        } else {
          alert('User already exists. Redirecting to login...');
          this.router.navigate(['/login']); // Redirect if user exists
        }
      });
    } else {
      alert('Please fill in the form correctly');
    }
  }

  // Helper getters for validation error messages
  get name() { return this.signupForm.get('name'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get phoneNo() { return this.signupForm.get('phoneNo'); }
}
