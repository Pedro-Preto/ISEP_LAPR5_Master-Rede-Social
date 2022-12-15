import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {ConnectionRequestService} from "../services/connection.request.service";

@Component({
  selector: 'app-suggest-group-page',
  templateUrl: './suggest-group-page.component.html',
  styleUrls: ['./suggest-group-page.component.css']
})
export class SuggestGroupPageComponent implements OnInit {
  loggedUserId: string;
  group:string[]=[];
commonTagsNumber:number;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
    this.loggedUserId = String(this.route.snapshot.queryParams['id']);
  }

  getSuggestGroup(){
    this.group=[];
    this.userService.getSuggestGroup(this.loggedUserId,this.commonTagsNumber).subscribe(data=>{
      for(let i=0;i<data.length;i++){
        this.group.push(data[i].username);
      }
    })
  }

}
