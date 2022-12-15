import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { ConnectionService } from "../services/connection.service";
import {ConnectionRequestService} from "../services/connection.request.service";

@Component({
  selector: 'app-suggest-to-registered-page',
  templateUrl: './suggest-to-registered-page.component.html',
  styleUrls: ['./suggest-to-registered-page.component.css']
})

export class SuggestToRegisteredPageComponent implements OnInit {

  loggedUserId: string;
  userList: User[] = [];
  usersToAddList: User[] = [];
  currentUser: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    //private connectionService: ConnectionService
    private connectionRequestService: ConnectionRequestService
  ) { }

  ngOnInit(): void {
    this.loggedUserId = String(this.route.snapshot.queryParams['id']);
    console.log(this.loggedUserId);
    this.getOtherUsers();
  }

  private getOtherUsers(): void {
    this.userService.getOtherUsers(this.loggedUserId).subscribe(data => {
        this.userList = data;
        console.log(this.userList);
    });
  }

  public addUserToList(user: User): void {
    let auxIndex = this.usersToAddList.indexOf(user, 0);
    if(auxIndex > -1){
      this.usersToAddList.splice(auxIndex, 1);
    } else {
      this.usersToAddList.push(user);
    }
    console.log(this.usersToAddList);
  }

  public doneEvent(): void {
    if(this.usersToAddList.length > 0){
      //create connections
      console.log("passou");
      for (var aux = 0; aux < this.usersToAddList.length; aux ++) {
        console.log(this.usersToAddList[aux].id);
        this.connectionRequestService.createConnectionRequest(this.loggedUserId, this.usersToAddList[aux].id);
      }
      this.router.navigate(['/login-page']);
    } else {
      console.log("nao");
    }
  }

}
