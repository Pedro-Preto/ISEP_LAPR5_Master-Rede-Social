import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-register-user-page',
  templateUrl: './register-user-page.component.html',
  styleUrls: ['./register-user-page.component.css']
})
export class RegisterUserPageComponent implements OnInit {

  allUsers: User[] = [];
  loggedUserId: string;
  user: User;
  userName: string;
  birthday:string;
  emotionalState:string;
  gender:string;
  description: string;
  phoneNumber: string;
  address: string;
  email:string;
  pass:string;
  tag:string;
  agreed:string;
  agreed1:string;

  passRepeated:string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }
  public iAgree(){
    var checkBox = <HTMLInputElement> document.getElementById("accept");
    if(checkBox.checked){
      this.agreed="true";
      console.log(this.agreed);
    }else {
      this.agreed="false";
      console.log(this.agreed)
    }
  }

  public AgreeWithErasePolicy(){
    var checkBox = <HTMLInputElement> document.getElementById("accept1");
    if(checkBox.checked){
      this.agreed1="true";
      console.log(this.agreed1)
    }else {
      this.agreed1="false";
      console.log(this.agreed1)
    }
  }

public genderOption(gender:string){
    this.gender=gender;
    console.log(this.gender);
}
  public registerUser(): void {
    if(this.agreed==="true" && this.agreed1==="true"){
      console.log(this.agreed1)
      console.log(this.agreed);
      if(this.pass===this.passRepeated) {
      this.userService.registerUser(this.userName, this.birthday, this.emotionalState, this.gender, "", this.phoneNumber, this.address, this.email, this.pass, this.tag).subscribe(data => {
        console.log(data);
        this.user = data;
        this.userService.getUsers().subscribe(data => {
          this.allUsers = data;
          if (this.allUsers.length > 1) {
            console.log(this.user.id);
            this.router.navigate(['/suggest-page'], {queryParams: {id: this.user.id}});
          } else {
            this.router.navigate(['/login-page']);
          }
        });
      });
    }else {
      console.log("PASS- "+this.pass);
      console.log("PASS Repeated- "+this.passRepeated);
    }
    }else {
      console.log("First Check Box- "+this.agreed);
      console.log("Second Check Box- "+this.agreed1);
    }
  }
}
