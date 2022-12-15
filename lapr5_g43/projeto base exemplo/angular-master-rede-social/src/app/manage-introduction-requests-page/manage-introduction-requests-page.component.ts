import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { IntroductionRequestService } from '../services/introduction-request.service';
import {UserService} from "../services/user.service";

@Component({
    selector: 'app-manage-introduction-request-page',
    templateUrl: './manage-introduction-requests-page.component.html',
    styleUrls: ['./manage-introduction-requests-page.component.css']
  })
  export class ManageIntroductionRequestComponent implements OnInit {

    loggedUserId: string;


    constructor(
      private route: ActivatedRoute,
      private userService: UserService,
      private intRequestService: IntroductionRequestService
    ) { }

    ngOnInit(): void {
   this.loggedUserId = String(this.route.snapshot.queryParams['id']);
    //  console.log(this.loggedUserId);
     // this.getUserIntroductionRequests();
    }

    public logout(){
      console.log(this.loggedUserId);
      this.userService.logout(this.loggedUserId).subscribe(data => {
        console.log(data);
      })

    }
  }
