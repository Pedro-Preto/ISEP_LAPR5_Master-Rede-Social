import { Component, OnInit } from '@angular/core';

// @ts-ignore
import {ConnectionRequest} from "../model/ConnectionRequest";
import {ConnectionRequestService} from "../services/connection.request.service";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-connection-request',
  templateUrl: './connection-request.component.html',
  styleUrls: ['./connection-request.component.css']
})
export class ConnectionRequestComponent implements OnInit {

  connectionRequest:ConnectionRequest;
  tagsArray:string [][]=[];

  constructor(
    private route: ActivatedRoute,
    private connectionRequestService: ConnectionRequestService
  ) { }

  ngOnInit(): void {
    this.getPendingConnections();
  }

  private getPendingConnections(): void {
    const id = String(this.route.snapshot.queryParams['id']);
    //console.log(this.route.snapshot.queryParams['id']);
    //console.log(id);
    this.connectionRequestService.getUserPendingConnections(id).subscribe(data => {
      console.log(data);
      this.connectionRequest = data;
      console.log( data[0].tags[0].tagIdValue);
      console.log(data[0].tags.length);

      for(let i=0;i<data.length;i++){
        for(let j=0;j<data[i].tags.length;j++){
          console.log(data[i].tags[j].tagIdValue);
        if(!(this.tagsArray.find(x=>x===data[i].tags[j].tagIdValue))){
          this.tagsArray.push(data[i].tags[j].tagIdValue);
        }
        }
      }

    })
    //this.numberOfTags= data.tags.values();

  }


}
