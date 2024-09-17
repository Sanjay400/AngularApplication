import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:5000'; // Base URL for your JSON server

  constructor(private http: HttpClient) {}

  // Get user cart based on their ID
  getUserCart(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`);
  }

  // Add product to the user's cart
  addToCart(userId: number, product: any): Observable<any> {
    return this.getUserCart(userId).pipe(map(user => {
      user.cart.push(product); // Add product to the cart array
      return this.http.put(`${this.apiUrl}/users/${userId}`, user);
    }));
  }

  // Remove product from cart
  removeFromCart(userId: number, productId: number): Observable<any> {
    return this.getUserCart(userId).pipe(map(user => {
      user.cart = user.cart.filter((item: any) => item.id !== productId);
      return this.http.put(`${this.apiUrl}/users/${userId}`, user);
    }));
  }

  // Update the quantity of a product
  updateCartItem(userId: number, productId: number, quantity: number): Observable<any> {
    return this.getUserCart(userId).pipe(map(user => {
      const product = user.cart.find((item: any) => item.id === productId);
      if (product) {
        product.quantity = quantity; // Update product quantity
      }
      return this.http.put(`${this.apiUrl}/users/${userId}`, user);
    }));
  }

  // Calculate total price of items in the cart
  calculateTotal(cart: any[]): number {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}

