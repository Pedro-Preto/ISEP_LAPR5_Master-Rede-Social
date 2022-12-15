import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  loggedUserId: string;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    userService.editProfile("", "", "", "", "", "", "");
  }

  ngOnInit(): void {
    this.loggedUserId = String(this.route.snapshot.queryParams['id']);
    console.log(this.loggedUserId);

    if (!localStorage.getItem('called')) {
    setTimeout(function() {location.reload();}, 500);
      localStorage.setItem('called', 'no reload')
    } else {
      localStorage.removeItem('called')
    }
  }

  public logout(){
    console.log(this.loggedUserId);
    this.userService.logout(this.loggedUserId).subscribe(data => {
      console.log(data);
    })
  }

}
