import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {IntroductionRequestService} from "../services/introduction-request.service";

@Component({
  selector: 'app-make-introduction-request-page',
  templateUrl: './make-introduction-request-page.component.html',
  styleUrls: ['./make-introduction-request-page.component.css']
})
export class MakeIntroductionRequestPageComponent implements OnInit {
loggedUserId2:string;
  loggedUserId: string;
  loggedUserName:string;
  userNameInter:string;
  idInter:string;
  userNameTarget:string;
  idTarget:string;
  messageToInter:string;
  messageToTarget:string;
  strength:string;
  tag:string;
  myFriends:string[][]=[];
  interFriends:string [][]=[];

  constructor(private route: ActivatedRoute, private userService: UserService, private introductionRequestService:IntroductionRequestService,private router: Router) {
  }

  ngOnInit(): void {
    this.loggedUserId = String(this.route.snapshot.queryParams['id']);
   this.loggedUserId2= String(this.route.snapshot.queryParams['id']);
    console.log(this.loggedUserId);
    this.getUserById();
  }

  public logout():void{
    console.log(this.loggedUserId);
    this.userService.logout(this.loggedUserId).subscribe(data => {
      console.log(data);
    })
  }
  public getUserById(){
    console.log(this.loggedUserId);
    this.userService.getUser(this.loggedUserId).subscribe(data => {
      console.log(data);
      this.loggedUserName=data.userName.username;
      this.getMyFriends();
    })
  }

  public getMyFriends():void{
    console.log(this.loggedUserName);
    this.userService.getUserFriends(this.loggedUserName).subscribe(data => {
      console.log("this is my net")
      console.log(data);
      for(var i=0;i<data.length;i++){
        this.myFriends[i]=data[i].userName.username;
      }
      console.log(this.myFriends);
    })
  }
  public getIntermediaryUserFriends():void{
    console.log("The chosen interm is");
    console.log(this.userNameInter);
    this.userService.getUserFriends(this.userNameInter).subscribe(data => {
     console.log("this are inter friends");
      console.log(data);
      this.interFriends=[];
    for (var i=0;i<data.length;i++) {
      this.interFriends[i] = data[i].userName.username;
    }
    for(var j=0;j<data.length;j++) {
  if(this.interFriends[j].toString()==this.loggedUserName){
    this.interFriends[j]=[];  }
}
    })
  }
  public getIdOfUserInterByUsername():void{
    console.log(this.userNameInter);
    this.userService.getByKeyWord(this.userNameInter).subscribe(data => {
      console.log(data);
      this.idInter=data[0].id;
    this.getIdOfUserTargetByUsername();
    })
  }

  public getIdOfUserTargetByUsername():void{
    console.log(this.userNameTarget);
    this.userService.getByKeyWord(this.userNameTarget).subscribe(data => {
      console.log(data);
      this.idTarget=data[0].id;
    this.makeIntroductionRequest();
    })
  }
  public makeIntroductionRequest():void{
   this.introductionRequestService.makeIntroductionRequest(this.loggedUserId,this.idInter,this.idTarget,this.messageToInter,this.messageToTarget,this.strength,this.tag).subscribe(data => {
     console.log(data);
     this.router.navigate(['/profile-page'], {queryParams: {id: this.loggedUserId2}});


   })
  }


}


