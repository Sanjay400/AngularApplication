import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';  // Assuming you have a UserService for handling user data
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data: any[]) => {
      this.users = data;
    });
  }

  editUser(userId: string) {
    this.router.navigate(['/edit-user', userId]);  // Navigate to edit user page
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers(); // Reload users after deletion
    });
  }

  toggleUserStatus(user: any) {
    user.active = !user.active; // Toggle activation
    this.userService.updateUser(user.id, user).subscribe(() => {
      this.loadUsers(); // Refresh user list after update
    });
  }

  viewUserOrders(userId: string) {
    this.router.navigate(['/user-orders', userId]);  // Navigate to view order history for the user
  }
}
