import {Component, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import { FormsModule } from "@angular/forms";
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-connection-page.component.html',
  styleUrls: ['./edit-connection-page.component.css']
})
export class EditConnectionPageComponent implements OnInit {

  loggedUserId: string;
  username: string;
  user: User;
  connectionToUpdate: any;
  connectionToUpdateId: string;
  connections: string[] = [];
  selectedUser: string;
  selectedUserObject: User;
  selectedUserId: string;


    user1Id: string;
    user1ConnectionStrength: string;
    user2Id: string;
    connectionTags:string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private connectionService: ConnectionService
  ) { }

  ngOnInit(): void {
    this.loggedUserId = String(this.route.snapshot.queryParams['id']);
    console.log(this.loggedUserId);
    this.userService.getUser(this.loggedUserId).subscribe(data => {
        this.user = data;
        this.getConnections();
    })
  }

  public getConnections(){
    var aux;
    console.log(this.user);
    this.connectionService.getConnectionByUser(this.user.userName.username).subscribe(data => {
        for(aux = 0; aux <data.length; aux++){
            // /console.log("Connection: " +data[aux]);
            this.connections[aux] = data[aux].userName.username;
            console.log("Connection: " +this.connections[aux]);
        }
    console.log(this.connections);
    })
    }

    public updateConnection(){
      this.userService.getByKeyWord(this.selectedUser).subscribe(data => {
          this.selectedUserObject = data[0];
          this.selectedUserId = this.selectedUserObject.id;
          console.log(this.loggedUserId);
          console.log(this.selectedUserId);
          this.connectionService.getConnectionByUsers(this.loggedUserId, this.selectedUserId).subscribe(otherData =>{
              this.connectionToUpdate = otherData;
              this.connectionToUpdateId = this.connectionToUpdate.id;
              console.log("ConnectionId: " +this.connectionToUpdateId);
              console.log("user1ConnectionStrength: " +this.user1ConnectionStrength);
              console.log("connectionTags: " +this.connectionTags);
              this.connectionService.updateFriendConnection(this.connectionToUpdateId, this.loggedUserId,
                  this.user1ConnectionStrength, this.selectedUserId, this.connectionTags);
        });
      });
    }
}
