import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {ConnectionService} from "../services/connection.service";
import {CloudData, ZoomOnHoverOptions} from "angular-tag-cloud-module";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-tag-cloud-user-connections-page',
  templateUrl: './tag-cloud-user-connections-page.component.html',
  styleUrls: ['./tag-cloud-user-connections-page.component.css']
})
export class TagCloudUserConnectionsPageComponent implements OnInit {

  loggedUserId: string;
  zoomOnHoverOptions: ZoomOnHoverOptions = {
    scale: 1.3, // Elements will become 130 % of current zize on hover
    transitionTime: 1.2, // it will take 1.2 seconds until the zoom level defined in scale property has been reached
    delay: 0.8 // Zoom will take affect after 0.8 seconds
  };

  data: CloudData[] = [];

  constructor(private route: ActivatedRoute,
              private userService:UserService,private connectionService:ConnectionService) { }

  ngOnInit(): void {
    this.loggedUserId = String(this.route.snapshot.queryParams['id']);
    console.log(this.loggedUserId);
    this.getMyConnectionsTagCloud();
  }
  public logout(){
    console.log(this.loggedUserId);
    this.userService.logout(this.loggedUserId).subscribe(data => {
      console.log(data);
    })
  }

  public getMyConnectionsTagCloud(){
    const id = String(this.route.snapshot.queryParams['id']);
    this.connectionService.getMyConnectionsTagCloud(id).subscribe(data=>{
      //  this.tags=data;
      console.log(data)
      for(let i=0;i<data.length;i++){
        console.log("AQUIIII")
        this.data[i]={text:data[i].tag,weight:data[i].weight}
      }
      this.changeTagCloud();

    })
  }

  public changeTagCloud(){
    let changedData$: Observable<CloudData[]> = of([]);

    changedData$.subscribe(res => {

      for(let i=0;i<this.data.length;i++){
        res.push(this.data[i]);
      }
      this.data=res;
    });

  }
}
