import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loggedUserId: any;
  email:string;
  pass:string;
  numberOfUsers:number;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getNumberOfUsersUsingTheApplication();
  }

  public login(): void {
    this.userService.login(this.email,this.pass).subscribe(async data => {
      this.getUserIdByEmail()
    })
  }

  public getUserIdByEmail(): void {
    this.userService.getIdByEmail(this.email).subscribe(data => {
      this.loggedUserId = data;
      this.router.navigate(['/profile-page'], {queryParams: {id: this.loggedUserId}});
      return true;
    })
  }
  public getNumberOfUsersUsingTheApplication(){
    this.userService.getUsers().subscribe(data=>{
      this.numberOfUsers=data.length;
    })
  }



}
