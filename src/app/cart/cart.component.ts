import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  userId!: number;
  cart: any[] = [];  // Initialize cart as an empty array
  totalPrice: number = 0;

  constructor(private http: HttpClient,private router:Router) {}

  ngOnInit(): void {
    // Retrieve user ID from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    this.userId = loggedInUser.id;
    if (this.userId) {
      this.loadCart();
    } else {
      alert('User not logged in');
    }
  }

  loadCart(): void {
    // Fetch user data from API
    this.http.get<any>(`http://localhost:5000/users/${this.userId}`).subscribe(user => {
      this.cart = user.cart || [];
      this.calculateTotal();
    }, error => {
      console.error('Error loading user data:', error);
      alert('An error occurred while loading the cart');
    });
  }

  calculateTotal(): void {
    // Calculate the total price of the cart
    this.totalPrice = this.cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }

  increaseQuantity(item: any): void {
    // Increase the quantity of an item
    item.quantity = (item.quantity || 0) + 1;
    this.calculateTotal();
    this.updateCart();
  }

  decreaseQuantity(item: any): void {
    // Decrease the quantity of an item, ensure quantity does not go below 1
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.calculateTotal();
      this.updateCart();
    }
  }

  removeItem(item: any): void {
    // Remove an item from the cart
    this.cart = this.cart.filter(cartItem => cartItem !== item);
    this.calculateTotal();
    this.updateCart();
  }

  updateCart(): void {
    // Update the cart on the server
    this.http.patch<any>(`http://localhost:5000/users/${this.userId}`, { cart: this.cart }).subscribe(() => {
      console.log('Cart updated successfully');
    }, error => {
      console.error('Error updating cart:', error);
      alert('An error occurred while updating the cart');
    });
  }
  placeOrder(): void {
    this.router.navigate(['/shopping']);
  }
  getImageUrl(imagePath: string): string {
    // Remove './' from the path if present
    return imagePath.startsWith('./') ? imagePath.substring(2) : imagePath;
  }

  
}
