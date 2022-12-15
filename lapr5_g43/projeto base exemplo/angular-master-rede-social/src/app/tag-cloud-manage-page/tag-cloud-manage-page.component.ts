import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {ConnectionRequestService} from "../services/connection.request.service";

@Component({
  selector: 'app-tag-cloud-manage-page',
  templateUrl: './tag-cloud-manage-page.component.html',
  styleUrls: ['./tag-cloud-manage-page.component.css']
})
export class TagCloudManagePageComponent implements OnInit {

  loggedUserId: string;


  constructor(private route: ActivatedRoute,
              private userService:UserService,) { }

  ngOnInit(): void {
    this.loggedUserId = String(this.route.snapshot.queryParams['id']);
    console.log(this.loggedUserId);
  }
  public logout(){
    console.log(this.loggedUserId);
    this.userService.logout(this.loggedUserId).subscribe(data => {
      console.log(data);
    })
  }

}
