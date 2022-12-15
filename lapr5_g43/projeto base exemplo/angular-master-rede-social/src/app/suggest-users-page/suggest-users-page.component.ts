import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {PrologPathsService} from "../services/prolog-paths.service";

@Component({
  selector: 'app-suggest-users-page',
  templateUrl: './suggest-users-page.component.html',
  styleUrls: ['./suggest-users-page.component.css']
})
export class SuggestUsersPageComponent implements OnInit {

  loggedUserId: string;
  level:number;
  suggestUsers:string[]=[];

  constructor(private route: ActivatedRoute, private userService: UserService,private prologService:PrologPathsService) {
  }

  ngOnInit(): void {
    this.loggedUserId = String(this.route.snapshot.queryParams['id']);
    console.log(this.loggedUserId);


  }

  public logout(){
    console.log(this.loggedUserId);
    this.userService.logout(this.loggedUserId).subscribe(data => {
      console.log(data);
    })
  }

  public start(){
    this.userService.getUser(this.loggedUserId).subscribe(data=>{
      this.getSuggestedUsers(data.userName.username);
    });
  }

  public getSuggestedUsers(name:string){
    this.prologService.getSuggestUsers(name,this.level).subscribe(data=>{
      for(let i=0;i<data.users.length;i++){
        this.suggestUsers[i]=data.users[i].replace('"', '');
      }
    });

  }
}
