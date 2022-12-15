import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {IntroductionRequestService} from "../services/introduction-request.service";

@Component({
  selector: 'app-search-users-friends-page',
  templateUrl: './search-users-friends-page.component.html',
  styleUrls: ['./search-users-friends-page.component.css']
})
export class SearchUsersFriendsPageComponent implements OnInit {

  loggedUserId: string;
  chosenUser:string;
  users:string[]=[]
  users2:string[]=[];
  chosenUser2:string;
  commonFriends:string []=[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private intRequestService: IntroductionRequestService
  ) { }

  ngOnInit(): void {
    this.loggedUserId = String(this.route.snapshot.queryParams['id']);
    this.getAllUsers();
    //  console.log(this.loggedUserId);
    // this.getUserIntroductionRequests();
  }

  public logout(){
    console.log(this.loggedUserId);
    this.userService.logout(this.loggedUserId).subscribe(data => {
      console.log(data);
    })
  };

  public getAllUsers(){
    this.userService.getUsers().subscribe(data=>{
      for (let i=0;i<data.length;i++){
      this.users[i]=data[i].userName.username;
      }
    })
  }
  public getSelectedUserFriends(){
    this.users2=this.users;
    this.users2.forEach( (item, index) => {
      if(item === this.chosenUser) this.users2.splice(index,1);
    });
}

  public getUsersCommonFriends(){
    this.userService.getUsersCommonFriends(this.chosenUser,this.chosenUser2).subscribe(data=>{
      for(let i=0;i<data.length;i++){
      this.commonFriends[i]=data[i].userName.username;
      }
    })

}
}


