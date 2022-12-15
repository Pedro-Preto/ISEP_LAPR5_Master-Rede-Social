import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {ConnectionRequestService} from "../services/connection.request.service";
import {ConnectionService} from "../services/connection.service";
import {IntroductionRequestService} from "../services/introduction-request.service";
import {PostService} from "../services/post.service";

@Component({
  selector: 'app-delete-user-account-page',
  templateUrl: './delete-user-account-page.component.html',
  styleUrls: ['./delete-user-account-page.component.css']
})
export class DeleteUserAccountPageComponent implements OnInit {

  loggedUserId: string;
  agreed:string;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private introductionRequestService:IntroductionRequestService,
    private connectionRequestService:ConnectionRequestService,
    private connectionService:ConnectionService,
    private router:Router,
    private postService:PostService

  ) { }

  ngOnInit(): void {
    this.loggedUserId = String(this.route.snapshot.queryParams['id']);
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

  public deleteAccount(){
    this.connectionService.deleteConnectionByUser(this.loggedUserId).subscribe(data=>{
      this.deleteConnectionRequest(this.loggedUserId);
    })
  }
  public deleteConnectionRequest(id:string){
    this.connectionRequestService.deleteConnectionRequestByUser(id).subscribe(data=>{
      this.deleteIntroductionRequest(id);
    })
  }
  public deleteIntroductionRequest(id:string){
    this.introductionRequestService.deleteIntroductionRequestByUser(id).subscribe(data=>{
    this.getUserName(id);
    })
  }
  public getUserName(id:string){
    this.userService.getUser(id).subscribe(data=>{
    this.deleteUser(id);
     // this.deleteUserPosts(id,data.userName.username);
    })
  }
  public deleteUserPosts(id:string,userName:string){
    this.postService.deleteUserPosts(userName).subscribe(data=>{
      this.deleteUser(id);
    })
  }
  public deleteUser(id:string){
    this.userService.deleteUserById(id).subscribe(data=>{
      this.router.navigate(['/login-page'], {queryParams: {id:undefined}});
    })
  }
}
