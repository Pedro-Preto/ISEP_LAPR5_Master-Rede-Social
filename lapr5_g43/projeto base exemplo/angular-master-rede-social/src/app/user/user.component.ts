import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { User } from '../model/User';
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  allUsers: User[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe(data => {
      console.log(data);
      this.allUsers = data;
    })
  }

}
