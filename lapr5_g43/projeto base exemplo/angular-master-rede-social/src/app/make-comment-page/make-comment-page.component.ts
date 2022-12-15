import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {PostService} from "../services/post.service";

@Component({
  selector: 'app-make-comment-page',
  templateUrl: './make-comment-page.component.html',
  styleUrls: ['./make-comment-page.component.css']
})
export class MakeCommentPageComponent implements OnInit {

  loggedUserId: string;
  content:string;


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

  public makeComment(){
    const postId=String(this.route.snapshot.queryParams['postId']);
    const postContent=String(this.route.snapshot.queryParams['postContent']);

    const username=String(this.route.snapshot.queryParams['userName']);
    this.postService.commentPost(postId,postContent,username,this.content).subscribe(data=>{
      this.router.navigate(['/profile-page'], {queryParams: {id: this.loggedUserId}});

      console.log(data);
  });

}
}
