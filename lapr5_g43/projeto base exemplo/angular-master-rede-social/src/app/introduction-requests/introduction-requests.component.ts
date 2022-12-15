import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IntroductionRequestService} from "../services/introduction-request.service";

@Component({
  selector: 'app-introduction-requests',
  templateUrl: './introduction-requests.component.html',
  styleUrls: ['./introduction-requests.component.css']
})
export class IntroductionRequestsComponent implements OnInit {

  introductionRequest: IntroductionRequest []=[] ;

  constructor(
    private route: ActivatedRoute,
    private introductionRequestService: IntroductionRequestService
  ) { }

  ngOnInit(): void {
    this.getPendingConnections();
  }

  private getPendingConnections(): void {
    const id = String(this.route.snapshot.queryParams['id']);
    //console.log(this.route.snapshot.queryParams['id']);
    //console.log(id);
    this.introductionRequestService.getUserPendingIntroductionRequests(id).subscribe(data => {
    console.log(data);
        for (var i=0;i<data.length;i++){
          this.introductionRequest[i]=data[i];
        }
          console.log(this.introductionRequest);

    })
    //this.numberOfTags= data.tags.values();

  }


}
