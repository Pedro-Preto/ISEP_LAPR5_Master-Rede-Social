import { Component, OnInit } from '@angular/core';

// @ts-ignore
import { User } from '../model/User';
import { UserService } from '../services/user.service'
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  userEmotionalState: string;
  userGender: string;
  userTags: string[] = [];
  numberOfTags: number;
  totalConnectionStrength: number;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getTotalFirstLevelConnectionStrength();
    console.log("total");
    console.log(this.totalConnectionStrength);
  }

  private getUserData(): void {
    const id = String(this.route.snapshot.queryParams['id']);
    this.userService.getUser(id).subscribe(data => {
      this.user = data;
      console.log(data);
      this.numberOfTags = data.tags.length;
      for(let n = 0; n < this.numberOfTags; n++) {
        this.userTags[n] = data.tags[n].tagIdValue;
      }
      switch(data.emotionalState.emotionalStateAtri){
        case 0: this.userEmotionalState = "Joyful"; break;
        case 1: this.userEmotionalState = "Distressed"; break;
        case 2: this.userEmotionalState = "Hopeful"; break;
        case 3: this.userEmotionalState = "Fearful"; break;
        case 4: this.userEmotionalState = "Relieved"; break;
        case 5: this.userEmotionalState = "Disappointed"; break;
        case 6: this.userEmotionalState = "Proud"; break;
        case 7: this.userEmotionalState = "Remorseful"; break;
        case 8: this.userEmotionalState = "Grateful"; break;
        case 9: this.userEmotionalState = "Angry"; break;
      }
      switch(data.gender.genderAtri){
        case 0: this.userGender = "Male"; break;
        case 1: this.userGender = "Female"; break;
        case 2: this.userGender = "Other"; break;
      }
    })
  }

  public getTotalFirstLevelConnectionStrength(){
    const id = String(this.route.snapshot.queryParams['id']);
    this.userService.getTotalFirstLevelConnectionStrength(id).subscribe(data => {
      console.log("total primeiro");
      console.log(data)
      this.totalConnectionStrength = data;
    })
  }


}
