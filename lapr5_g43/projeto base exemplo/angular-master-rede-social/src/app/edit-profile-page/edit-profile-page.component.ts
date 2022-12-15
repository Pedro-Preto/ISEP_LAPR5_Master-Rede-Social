import {Component, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.css']
})
export class EditProfilePageComponent implements OnInit {

  loggedUserId: string;
  user: User;
  userName: string;
  description: string;
  phoneNumber: string;
  address: string;
  tag: string;
  removeTag: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loggedUserId = String(this.route.snapshot.queryParams['id']);
    console.log(this.loggedUserId);
  }

  public editProfile(): void {
    console.log(this.userName);
    this.userService.editProfile(this.userName, this.description, this.phoneNumber, this.address, this.tag, this.removeTag, this.loggedUserId).subscribe(data => {
      console.log(data);
      this.user = data;
    })
  }

  public logout(){
    console.log(this.loggedUserId);
    this.userService.logout(this.loggedUserId).subscribe(data => {
      console.log(data);
    })
  }

}
