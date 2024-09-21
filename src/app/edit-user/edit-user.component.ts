import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  standalone:true,
  imports:[FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userId: string = '';
  userData: any = {};

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.loadUserData();
  }

  loadUserData() {
    this.userService.getUsers().subscribe((users: any[]) => {
      this.userData = users.find(user => user.id === this.userId);
    });
  }

  saveUser() {
    this.userService.updateUser(this.userId, this.userData).subscribe(() => {
      this.router.navigate(['/manage-users']);
    });
  }
}

