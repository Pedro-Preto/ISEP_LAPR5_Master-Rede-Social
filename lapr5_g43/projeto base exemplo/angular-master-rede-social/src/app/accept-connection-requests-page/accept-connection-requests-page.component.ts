import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {ConnectionRequestService} from "../services/connection.request.service";
import {ConnectionService} from "../services/connection.service";

@Component({
  selector: 'app-accept-connection-requests-page',
  templateUrl: './accept-connection-requests-page.component.html',
  styleUrls: ['./accept-connection-requests-page.component.css']
})
export class AcceptConnectionRequestsPageComponent implements OnInit {

  loggedUserId: string;
  connectionRequestIdArray:string[][]=[];
  connectionRequestId:string;
  strength:string;
  tag:string;
  constructor(private route: ActivatedRoute,private userService:UserService,private connectionRequestService:ConnectionRequestService,private router:Router) { }

  ngOnInit(): void {
    this.loggedUserId = String(this.route.snapshot.queryParams['id']);
    console.log(this.loggedUserId);
    this.getPendingConnections();
  }
  public logout(){
    console.log(this.loggedUserId);
    this.userService.logout(this.loggedUserId).subscribe(data => {
      console.log(data);
    })
  }

  public getPendingConnections(): void {
    const id = String(this.route.snapshot.queryParams['id']);
    //console.log(this.route.snapshot.queryParams['id']);
    //console.log(id);
    this.connectionRequestService.getUserPendingConnections(id).subscribe(data => {
      console.log(data);
      console.log(data[0].id);
      for(var i=0;i<data.length;i++){
        this.connectionRequestIdArray[i]=data[i].id;
      }
    })
  }
  public acceptConnectionRequest(){
    console.log("aquiii");
    console.log(this.connectionRequestId);
    console.log(this.strength);
    console.log(this.tag);
    this.connectionRequestService.acceptConnectionRequest(this.connectionRequestId,this.strength,this.tag).subscribe(data => {
      console.log(data);
      this.router.navigate(['/display-user-pending-connections-page'], {queryParams: {id: this.loggedUserId}});

    })
  }

}
