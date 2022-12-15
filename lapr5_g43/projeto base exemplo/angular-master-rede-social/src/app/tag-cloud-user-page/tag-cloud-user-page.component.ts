import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../services/user.service";
import { CloudData, ZoomOnHoverOptions } from 'angular-tag-cloud-module';
import {Observable, of} from "rxjs";
import {PostService} from "../services/post.service";

@Component({
  selector: 'app-tag-cloud-user-page',
  templateUrl: './tag-cloud-user-page.component.html',
  styleUrls: ['./tag-cloud-user-page.component.css']

})
export class TagCloudUserPageComponent implements OnInit {

  loggedUserId: string;
//tags:string []=[];

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
  this.buildTagCloud();
  }
  public logout(){
    console.log(this.loggedUserId);
    this.userService.logout(this.loggedUserId).subscribe(data => {
      console.log(data);
    })
  }
  public buildTagCloud(){
    let id=String(this.route.snapshot.queryParams['id'])
    this.userService.getUser(id).subscribe(data=>{
      this.getMyPostTags(data.userName.username);
    })
  }



  public getMyPostTags(username:string){
    let postTags:string[]=[];

    this.postService.getAllPosts().subscribe(data=> {
      for(let a=0;a<data.length;a++){
        if(data[a].userId==username){
          for(let b=0;b<data[a].tags.length;b++){
            postTags.push(data[a].tags[b].tag);
          }
        }
      }

      let stringTags:string="";

      for(let k=0;k<postTags.length;k++){
        stringTags=stringTags+","+postTags[k];
      }
      this.getMyTagCloud(stringTags)
    })
  }


  public getMyTagCloud(tags:string){
    this.userService.getMyTagCloud(tags).subscribe(data=>{
      console.log(data)
      for(let i=0;i<data.length;i++){
        this.data[i]={text:data[i].tag,weight:data[i].weight}
      }
      this.changeTagCloud();
    });
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
