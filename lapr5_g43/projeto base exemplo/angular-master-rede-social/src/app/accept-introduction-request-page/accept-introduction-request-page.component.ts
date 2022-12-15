import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {IntroductionRequestService} from "../services/introduction-request.service";

@Component({
  selector: 'app-accept-introduction-request-page',
  templateUrl: './accept-introduction-request-page.component.html',
  styleUrls: ['./accept-introduction-request-page.component.css']
})
export class AcceptIntroductionRequestPageComponent implements OnInit {

  loggedUserId: string;
  introductionRequestIdArray:string[][]=[];
  introductionRequestId:string;

  constructor(private route: ActivatedRoute,private userService:UserService,private introductionRequestService:IntroductionRequestService,private router:Router) { }

  ngOnInit(): void {
    this.loggedUserId = String(this.route.snapshot.queryParams['id']);
    console.log(this.loggedUserId);
    this.getPendingIntroduction();
  }
  public logout(){
    console.log(this.loggedUserId);
    this.userService.logout(this.loggedUserId).subscribe(data => {
      console.log(data);
    })
  }
  public getPendingIntroduction(): void {
    const id = String(this.route.snapshot.queryParams['id']);
    //console.log(this.route.snapshot.queryParams['id']);
    //console.log(id);
    this.introductionRequestService.getUserPendingIntroductionRequests(id).subscribe(data => {
      console.log(data);
      console.log(data[0].id);
      for(var i=0;i<data.length;i++){
        this.introductionRequestIdArray[i]=data[i].id;
      }
    })
  }
  public getById():void{
    console.log(this.introductionRequestId);
    this.introductionRequestService.getById(this.introductionRequestId).subscribe(data => {
      console.log(data);
      this.acceptIntroductionRequest(data.id,data.date.date,data.messageToIntermediary.message,data.messageToTarget.message,data.userRequesterId.value,data.userIntermediaryId.value,data.userTargetId.value,data.connectionStrength.strength,data.tags);
    })

  }
  public acceptIntroductionRequest(id:string,date: string, messageToIntermediary:string, messageToTarget:string, userRequesterId:string, userIntermediaryId:string, userTargetId:string, connectionStrength:string, tags:string): void {
    this.introductionRequestService.updateIntroductionRequest(id,date, messageToIntermediary, messageToTarget, userRequesterId, userIntermediaryId, userTargetId, connectionStrength, "","Approved").subscribe(data => {
      this.router.navigate(['/manage-introduction-requests-page'], {queryParams: {id: this.loggedUserId}});

    })
  }

}
