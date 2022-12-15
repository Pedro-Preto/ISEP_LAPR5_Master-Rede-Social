import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../services/post.service";
import {UserService} from "../services/user.service";
import {ConnectionService} from "../services/connection.service";

@Component({
  selector: 'app-friends-posts-page',
  templateUrl: './friends-posts-page.component.html',
  styleUrls: ['./friends-posts-page.component.css']
})
export class FriendsPostsPageComponent implements OnInit {
  loggedUserId: string;
  posts:PostsNode[]=[];
  myFriendsList:any[]=[]

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,private userService:UserService,private router:Router,private connectionService:ConnectionService
  ) { }

  ngOnInit(): void {
    this.loggedUserId = String(this.route.snapshot.queryParams['id']);
    this.getUserById();

  }

  public getUserById(){
    this.userService.getUser(  this.loggedUserId ).subscribe(data=>{
      this.myFriends(data.userName.username);
    })
  }



  public myFriends(name:string){
    this.userService.getUserFriends(name).subscribe(data=>{
   for(let i=0;i<data.length;i++){
     this.myFriendsList[i]=data[i].userName.username;
   }
      console.log(this.myFriendsList)
    })
    this.getFriendsPosts();
  }

  public getFriendsPosts() {
    this.postService.getAllPosts().subscribe(data=>{
      console.log(data);
      for(let i=0;i<data.length;i++){
        if(this.myFriendsList.includes(data[i].userId)){
          this.posts.push(data[i]);
        }
      }

    })
  }
  public like(id:string,content:string,userName:string){
    const loggedUserId = String(this.route.snapshot.queryParams['id']);
    this.postService.like(id,content).subscribe(data=>{
      this.router.navigate(['/profile-page'], {queryParams: {id: loggedUserId}});
      this.getChosenUserId(userName,1);

    })
  }

  public dislike(id:string,content:string,userName:string){
    const loggedUserId = String(this.route.snapshot.queryParams['id']);
    this.postService.dislike(id,content).subscribe(data=>{
      this.router.navigate(['/profile-page'], {queryParams: {id: loggedUserId}});
      this.getChosenUserId(userName,2);

    })
  }

  public comment(postId:string,postContent:string) {
    const id = String(this.route.snapshot.queryParams['id']);
    this.userService.getUser(id).subscribe(data => {
      this.router.navigate(['/make-comment-page'], {queryParams: {id:id,postId:postId,postContent:postContent,userName:data.userName.username}});
    });
  }



  public getChosenUserId(userName:string,likeOrDislike:number){
    this.userService.getByKeyWord(userName).subscribe(data=>{
      this.getConnectionByTwoUsers(data[0].id,likeOrDislike);
    })
  }

  public getConnectionByTwoUsers(id2:string,likeOrDislike:number){
    const id1 = String(this.route.snapshot.queryParams['id']);
    this.connectionService.getConnectionByUsers(id1,id2).subscribe(data=>{

      this.updateConnectionRelationStrength(data.id,likeOrDislike);
    })
  }
  public updateConnectionRelationStrength(connectionId:string,likeOrDislike:number){
    const userId = String(this.route.snapshot.queryParams['id']);
    this.connectionService.updateConnectionRelationStrength(connectionId,userId,likeOrDislike);
  }
}
