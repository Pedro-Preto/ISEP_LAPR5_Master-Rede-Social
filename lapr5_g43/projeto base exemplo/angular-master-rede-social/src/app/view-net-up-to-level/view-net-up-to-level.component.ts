import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ViewNetService} from "../services/view-net.service";

@Component({
  selector: 'app-view-net-up-to-level',
  templateUrl: './view-net-up-to-level.component.html',
  styleUrls: ['./view-net-up-to-level.component.css']
})
export class ViewNetUpToLevelComponent implements OnInit {

  loggedUserId: string;
  desiredLevel: number;
  listOfUsersInNet: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private netService: ViewNetService
  ) { }

  ngOnInit(): void {
    this.loggedUserId = String(this.route.snapshot.queryParams['id']);
  }

  viewNetEvent() {
    this.netService.viewNetOfUserUpToLevel(this.loggedUserId, this.desiredLevel).subscribe(data => {
      this.listOfUsersInNet = data;
      console.log(this.listOfUsersInNet);
    });
  }

}
