// user-orders.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-orders',
  standalone:true,
  imports:[FormsModule,CommonModule],
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  userId: string | null = null;
  orders: any[] = [];

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.loadOrderHistory();
  }

  loadOrderHistory() {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(user => {
        this.orders = user.orderhistory || [];
      });
    }
  }
}
