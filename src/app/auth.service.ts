import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/users'; // JSON Server users endpoint

  constructor(private http: HttpClient,private router:Router) {}

  // Signup function
  signUp(user: any): Observable<any> {
    // Add cart and orderhistory fields when user signs up
    const newUser = {
      ...user,
      cart: [],
      orderhistory: []
    };
    return this.http.post(this.baseUrl, newUser);
  }

  // Other authentication-related methods...
  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('loggedInUser');
    alert('You have been logged out.');
  }
}
