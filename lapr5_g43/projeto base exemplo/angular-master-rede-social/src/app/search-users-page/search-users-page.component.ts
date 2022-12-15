import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { ConnectionRequestService } from '../services/connection.request.service';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-search-users-page',
  templateUrl: './search-users-page.component.html',
  styleUrls: ['./search-users-page.component.css']
})
export class SearchUsersPageComponent implements OnInit {

  loggedUserId: string;
  keyword: string;
  users: string[] = [];
  selectedUserId: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private connectionRequestService: ConnectionRequestService,
    private router:Router
  ) { }

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

  public search(kw:string){
      console.log(kw);
      this.keyword = kw;
      this.userService.getByKeyWord(this.keyword).subscribe(data => {
        var aux;
        for(aux = 0; aux <data.length; aux++){
          this.users[aux] = data[aux].userName.username;
          this.selectedUserId=data[aux].id;
          console.log(this.users[aux]);
        }
      })
  }

  public sendConnectionRequest(){
        this.connectionRequestService.createConnectionRequest(this.loggedUserId, this.selectedUserId);
        this.router.navigate(['/profile-page'], {queryParams: {id: this.loggedUserId}});

  }
}
