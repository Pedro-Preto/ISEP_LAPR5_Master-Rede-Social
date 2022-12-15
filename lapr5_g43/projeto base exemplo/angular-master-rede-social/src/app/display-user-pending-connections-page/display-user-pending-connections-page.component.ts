import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {ConnectionRequestService} from "../services/connection.request.service";

@Component({
  selector: 'app-display-user-pending-connections-page',
  templateUrl: './display-user-pending-connections-page.component.html',
  styleUrls: ['./display-user-pending-connections-page.component.css']
})
export class DisplayUserPendingConnectionsPageComponent implements OnInit {
  loggedUserId: string;
  connectionRequestIdArray:string[][]=[];


  constructor(private route: ActivatedRoute,private userService:UserService,private connectionRequestService:ConnectionRequestService) { }

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

  private getPendingConnections(): void {
    const id = String(this.route.snapshot.queryParams['id']);
    //console.log(this.route.snapshot.queryParams['id']);
    //console.log(id);
    this.connectionRequestService.getUserPendingConnections(id).subscribe(data => {
      console.log(data);
      console.log("aquiii");
      console.log(data[0].id);
     for(var i=0;i<data.length;i++){
       this.connectionRequestIdArray[i]=data[i].id;
     }
    })
  }


}
