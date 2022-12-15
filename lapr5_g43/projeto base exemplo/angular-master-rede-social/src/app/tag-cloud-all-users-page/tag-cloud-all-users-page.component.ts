import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import {Observable, of} from "rxjs";
import {CloudData, ZoomOnHoverOptions} from "angular-tag-cloud-module";
import {PostService} from "../services/post.service";

@Component({
  selector: 'app-tag-cloud-all-users-page',
  templateUrl: './tag-cloud-all-users-page.component.html',
  styleUrls: ['./tag-cloud-all-users-page.component.css']
})
export class TagCloudAllUsersPageComponent implements OnInit {

  loggedUserId: string;

  zoomOnHoverOptions: ZoomOnHoverOptions = {
    scale: 1.3, // Elements will become 130 % of current zize on hover
    transitionTime: 1.2, // it will take 1.2 seconds until the zoom level defined in scale property has been reached
    delay: 0.8 // Zoom will take affect after 0.8 seconds
  };

  data: CloudData[] = [];


  constructor(private route: ActivatedRoute,
              private userService:UserService,private postService:PostService) { }

  ngOnInit(): void {
    this.loggedUserId = String(this.route.snapshot.queryParams['id']);
    console.log(this.loggedUserId);
    this.buildTagCloud();
  }

  public logout(){
    console.log(this.loggedUserId);
    this.userService.logout(this.loggedUserId).subscribe(data => {
      console.log(data);
    })
  }

  public buildTagCloud(){
    let string:string="";
    this.postService.getAllPosts().subscribe(data=>{
      for(let i=0;i<data.length;i++){
        for(let j=0;j<data[i].tags.length;j++){
          string=string+","+data[i].tags[j].tag;
        }
      }
      this.getTagCloudAllUsers(string);
    })
  }



public getTagCloudAllUsers(tagString:string){
    this.userService.getTagCloudAllUsers(tagString).subscribe(data=>{
    //  this.tags=data;
      console.log(data)
      for(let i=0;i<data.length;i++){
        console.log("AQUIIII")
        this.data[i]={text:data[i].tag,weight:data[i].weight}
      }
      this.changeTagCloud();

    })
}

  public changeTagCloud(){
    let changedData$: Observable<CloudData[]> = of([]);

    changedData$.subscribe(res => {

      for(let i=0;i<this.data.length;i++){
        res.push(this.data[i]);
      }
      this.data=res;
    });

  }



}
