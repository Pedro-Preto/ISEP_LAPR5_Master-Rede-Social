import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
// @ts-ignore
import {Posts} from "../model/Posts";
// @ts-ignore
import {PostsNode} from "../model/PostsNode";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private Url = 'https://localhost:5001/api/post/'
  private UrlNode = 'http://localhost:3000/api/'

  constructor(private httpClient: HttpClient) { }


  makePost(postContent:string,userName:string,tagList:string[]): Observable<any> {
    const body={"postId":"2","content": postContent, "date": new Date(), "userId": userName, "likes": 0, "dislikes": 0, "comments": [],"tags":tagList
    };
    return this.httpClient.post(this.UrlNode + 'posts',body).pipe(
      map(this.extractData));
  }
  like(id:string,content:string): Observable<any> {
    const body = {"postId":id, "content": content, "date": "15 January 2022", "userId": "PP", "likes": 0, "dislikes": 0, "comments": [{"commentContent": "comment", "commentDate":new Date(), "commentUserId":"userName"}],"tags":[]};
    return this.httpClient.put(this.UrlNode + 'like', body).pipe(
      map(this.extractData));
  }
  dislike(id:string,content:string): Observable<any> {
    const body = {"postId":id, "content": content, "date": "15 January 2022", "userId": "PP", "likes": 0, "dislikes": 0, "comments": [{"commentContent": "comment", "commentDate":new Date(), "commentUserId":"userName"}],"tags":[]};
    return this.httpClient.put(this.UrlNode + 'dislike', body).pipe(
      map(this.extractData));
  }

  commentPost(id:string,content:string,userName:string,comment:string): Observable<any> {
    const body = {"postId":id, "content": content, "date": "15 January 2022", "userId": "PP", "likes": 0, "dislikes": 0, "comments": [{"commentContent": comment, "commentDate":new Date(), "commentUserId":userName}],"tags":[]};
    return this.httpClient.put(this.UrlNode + 'makeComment', body).pipe(
      map(this.extractData));
  }

  getAllPosts():Observable<any> {
    return this.httpClient.get(this.UrlNode + 'allPosts').pipe(
      map(this.extractData));
  }

  deleteUserPosts(userName:string){
    const body = {"content": "content", "date": "15 January 2022", "userId": userName, "likes": 0, "dislikes": 0, "comments": [{"commentContent": "comment", "commentDate":new Date(), "commentUserId":"userName"}]};
    return this.httpClient.put(this.UrlNode + 'removePost',body).pipe(
      map(this.extractData));
}

  /*makePost(postContent:string,userName:string): Observable<any> {
      const body={"PostContent":postContent, "UserPosterName":userName, "PostUsersList":[]};
      return this.httpClient.post(this.Url + 'add',body).pipe(
        map(this.extractData));
    }*/

/*
  getMyPosts(userName:string):Observable<any> {
  return this.httpClient.get(this.Url + 'myPosts/'+userName).pipe(
    map(this.extractData));
  }
  getFriendsPosts(id:string){
    return this.httpClient.get(this.Url + 'getAllMyFriendsPosts/'+id).pipe(
      map(this.extractData));
  }*/


  /*commentPost(postId:string,userName:string,comment:string): Observable<any> {
    const body={"PostId":postId, "Username":userName, "Comment":comment};
    return this.httpClient.put(this.Url + 'commentPost',body).pipe(
      map(this.extractData));
  }*/

  private extractData(res: any) {
    return res || { };
  }
}
