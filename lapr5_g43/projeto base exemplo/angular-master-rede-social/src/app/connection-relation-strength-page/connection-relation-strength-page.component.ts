import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {ConnectionService} from "../services/connection.service";

@Component({
  selector: 'app-connection-relation-strength-page',
  templateUrl: './connection-relation-strength-page.component.html',
  styleUrls: ['./connection-relation-strength-page.component.css']
})
export class ConnectionRelationStrengthPageComponent implements OnInit {

  loggedUserId: string;
  userNames:string [][]=[];
  chosenFriend:string;
  connectionStrength:number;
  connectionRelationStrength:number;

  constructor(private route: ActivatedRoute, private userService: UserService, private connectionService: ConnectionService) {

  }

  ngOnInit(): void {
    this.loggedUserId = String(this.route.snapshot.queryParams['id']);
    console.log(this.loggedUserId);
    this.getNameOfLoggedUserById();
  }

  public logout() {
    console.log(this.loggedUserId);
    this.userService.logout(this.loggedUserId).subscribe(data => {
      console.log(data);
    })
  }
  public getNameOfLoggedUserById(){
    const id = String(this.route.snapshot.queryParams['id']);
    this.userService.getUser(id).subscribe(data=>{
      this.getUserFriends(data.userName.username);
    })
  }

  public getUserFriends(name:string):void {
    this.userService.getUserFriends(name).subscribe(data => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        this.userNames[i] = data[i].userName.username;
      }
    });
  }
  public getChosenFriendId():void {
    this.userService.getByKeyWord(this.chosenFriend).subscribe(data=>{
      console.log(data);
      console.log(data[0].id);
      this.getConnectionByUsers(data[0].id);
    })
  }
  public getConnectionByUsers(id:string):void{
    this.connectionService.getConnectionByUsers(this.loggedUserId,id).subscribe(data=>{
      console.log("Connection")
      console.log(data);
      if(this.loggedUserId==data.user1Id.value){

        this.connectionStrength=data.user1ConnectionStrength.strength;
        this.connectionRelationStrength=data.user1RelationStrength.strength;

      } else {
        this.connectionStrength=data.user2ConnectionStrength.strength;
        this.connectionRelationStrength=data.user2RelationStrength.strength;

      }
    })
  }


}
