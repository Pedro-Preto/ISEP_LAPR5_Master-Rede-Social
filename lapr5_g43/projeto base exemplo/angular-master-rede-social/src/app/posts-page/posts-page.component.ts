import { Component, OnInit } from '@angular/core';


import {PostService} from "../services/post.service";
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConnectionService} from "../services/connection.service";

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.css']
})
export class PostsPageComponent implements OnInit {

  posts:PostsNode[]=[];
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,private userService:UserService,private router:Router, private connectionService:ConnectionService
  ) { }

  ngOnInit(): void {

    this.getById();
  }

public getById(){
  const id = String(this.route.snapshot.queryParams['id']);
  this.userService.getUser(id).subscribe(data=>{
    console.log(data);
    this.getMyPosts(data.userName.username);
  });
}
  public getMyPosts(userName:string){
    this.postService.getAllPosts().subscribe(data=>{
      console.log(data)
      for(let i=0;i<data.length;i++){
        if(userName==data[i].userId){
       this.posts.push(data[i]);
        }
      }
    });
  }

  public like(postId:string,content:string){
    const loggedUserId = String(this.route.snapshot.queryParams['id']);

    this.postService.like(postId,content).subscribe(data=>{
      this.router.navigate(['/profile-page'], {queryParams: {id: loggedUserId}});
    })
  }

  public dislike(postId:string,content:string){
    const loggedUserId = String(this.route.snapshot.queryParams['id']);
    this.postService.dislike(postId,content).subscribe(data=>{
      this.router.navigate(['/profile-page'], {queryParams: {id: loggedUserId}});

    })
  }

public comment(postId:string,postContent:string) {
  const id = String(this.route.snapshot.queryParams['id']);
  this.userService.getUser(id).subscribe(data => {
    this.router.navigate(['/make-comment-page'], {queryParams: {id:id,postId:postId,postContent:postContent,userName:data.userName.username}});
  });
}


}
