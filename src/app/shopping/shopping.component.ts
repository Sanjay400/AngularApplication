import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Adjust the path to where you saved models.ts
import { Product,User } from '../model';
@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent {
  address: string = '';
  phone: string = '';
  paymentMethod: string = 'online';  // Default to online payment

  constructor(private http: HttpClient, private router: Router) {}

  placeOrder(): void {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}') as User;
    const userId = loggedInUser.id;

    if (userId) {
      this.http.get<User>(`http://localhost:5000/users/${userId}`).subscribe(user => {
        const newOrder = {
          products: user.cart.map((item: Product) => ({
            ...item,
            quantity: item.quantity || 1  // Ensure quantity is set, default to 1 if not present
          })),
          address: this.address,
          phone: this.phone,
          paymentMethod: this.paymentMethod,
          orderDate: new Date().toISOString(),
          deliveryDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days later
        };

        // Append the new order to the existing order history
        const updatedOrderHistory = [...user.orderhistory, newOrder];

        // Update the user with the new order history
        this.http.patch<any>(`http://localhost:5000/users/${userId}`, { orderhistory: updatedOrderHistory }).subscribe(() => {
          // Clear the cart
          this.http.patch<any>(`http://localhost:5000/users/${userId}`, { cart: [] }).subscribe(() => {
            this.router.navigate(['/orderhistory']);
          });
        });
      });
    }
  }
}
