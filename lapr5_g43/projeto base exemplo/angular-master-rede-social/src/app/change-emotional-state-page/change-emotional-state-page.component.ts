import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-change-emotional-state-page',
  templateUrl: './change-emotional-state-page.component.html',
  styleUrls: ['./change-emotional-state-page.component.css']
})
export class ChangeEmotionalStatePageComponent implements OnInit {
  emotionalState:string;
  loggedUserId: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loggedUserId = String(this.route.snapshot.queryParams['id']);
    console.log(this.loggedUserId);
  }
  public updateEmotionalState(): void {
    console.log(this.emotionalState);
    this.userService.updateEmotionalState(this.loggedUserId,this.emotionalState).subscribe(data => {
    })
  }
  public logout(){
    console.log(this.loggedUserId);
    this.userService.logout(this.loggedUserId).subscribe(data => {
      console.log(data);
    })

  }
}
