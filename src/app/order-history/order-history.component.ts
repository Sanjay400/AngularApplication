import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-history',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    const userId = loggedInUser.id;

    if (userId) {
      this.http.get<any>(`http://localhost:5000/users/${userId}`).subscribe(user => {
        this.orders = user.orderhistory || [];
      });
    } else {
      alert('User not logged in');
    }
  }

  cancelOrder(order: any): void {
    const currentDate = new Date();
    const orderDate = new Date(order.orderDate);
    const diffTime = Math.abs(currentDate.getTime() - orderDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      // Remove from order history
      this.orders = this.orders.filter(o => o !== order);

      // Update the user data
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
      const userId = loggedInUser.id;

      if (userId) {
        this.http.patch<any>(`http://localhost:5000/users/${userId}`, { orderhistory: this.orders }).subscribe(() => {
          alert('Order canceled successfully');
          
        });
      }
    } else {
      alert('Orders can only be canceled within 24 hours of placement');
    }
  }
}

