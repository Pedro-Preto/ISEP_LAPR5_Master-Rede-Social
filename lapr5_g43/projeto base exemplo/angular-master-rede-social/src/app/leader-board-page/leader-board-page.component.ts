import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {ConnectionService} from "../services/connection.service";

@Component({
  selector: 'app-leader-board-page',
  templateUrl: './leader-board-page.component.html',
  styleUrls: ['./leader-board-page.component.css']
})
export class LeaderBoardPageComponent implements OnInit {

  loggedUserId: string;
  stats:LeaderBoard[]=[];
  leaderBoardDimension:number;
  leaderBoardFortress:number;

  constructor(private route: ActivatedRoute,private userService:UserService,private connectionService:ConnectionService) { }

  ngOnInit(): void {
    this.loggedUserId = String(this.route.snapshot.queryParams['id']);
    //this.loggedUserId = '003dd162-d6cd-45a0-8afd-7787dc536854';
    console.log(this.loggedUserId);
    this.getLeaderBoardStats();
    this.getLeaderBoardFortress()
  }
  public logout(){
    console.log(this.loggedUserId);
    this.userService.logout(this.loggedUserId).subscribe(data => {
      console.log(data);
    });
  }
  public getLeaderBoardStats(){
    this.connectionService.getLeaderBoardStats().subscribe(data=>{
        this.stats=data;
        if(data==undefined){
          this.leaderBoardDimension=0
        }else {
        this.leaderBoardDimension=data.length;
        }
        console.log(this.stats);

    })
  }
  public getLeaderBoardFortress(){
    this.connectionService.getLeaderBoardFortress().subscribe(data=>{
    console.log(data);
    if(data==undefined){
      this.leaderBoardFortress=0;
    }else {
      this.leaderBoardFortress=data;
    }
    })
  }

}
