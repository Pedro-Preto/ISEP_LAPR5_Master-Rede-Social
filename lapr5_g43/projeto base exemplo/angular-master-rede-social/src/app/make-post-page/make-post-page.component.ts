import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {PostService} from "../services/post.service";

@Component({
  selector: 'app-make-post-page',
  templateUrl: './make-post-page.component.html',
  styleUrls: ['./make-post-page.component.css']
})
export class MakePostPageComponent implements OnInit {

  loggedUserId: string;
  content:string;
  tagList:any[]=[];
  tag:string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private postService:PostService,
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
  });}

  public getById(){
    const id=String(this.route.snapshot.queryParams['id']);
    this.userService.getUser(id).subscribe(data=>{
      this.makePost(data.userName.username);
    })
  }


  public makePost(username:string){
    this.postService.makePost(this.content,username,this.tagList).subscribe(data=>{
     this.router.navigate(['/profile-page'], {queryParams: {id: this.loggedUserId}});

    })
  }

  public addTags(){
    this.tagList.push({tag:this.tag});
    var inputBox = <HTMLInputElement> document.getElementById("tag");
inputBox.value=""
    console.log(this.tagList);
  }

}
