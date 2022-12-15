import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
// @ts-ignore
import { LeaderBoard } from '../model/LeaderBoard';
@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  Url = 'https://localhost:5001/api/connection';
  private Url1 = 'https://localhost:5001/api';

  constructor(private httpClient: HttpClient) { }

/*
  createConnection(id: string, otherId: string): void {
    const body = { "User1Id": id, "User2Id": otherId };
    this.httpClient.post(this.Url + '/addConnectionRequestFromSuggested' ,body).subscribe(r=>{});
    console.log("Body: " +"User1Id: " +id  +", User2Id: " +otherId);
  }
*/

  public addConnection(name: string, otherName: string) {
    const body = { "User1Name": name, "User2Name": otherName };
    this.httpClient.post(this.Url + '/addConnectionFromNames' ,body).subscribe(r=>{});
  }

  public getAll():Observable<any> {
    return this.httpClient.get(this.Url + '/getAll').pipe(
      map(this.extractData));
  }

  public getConnectionByUser(name:string):Observable<any> {
    return this.httpClient.get(this.Url1 + '/user/GetFriends/' + name).pipe(
      map(this.extractData));
  }

  public getConnectionByUsers(id:string, otherId:string):Observable<any> {
    return this.httpClient.get(this.Url + '/ids/' + id +"/" +otherId).pipe(
      map(this.extractData));
  }

  public getConnectionById(id:string):Observable<any> {
    return this.httpClient.get(this.Url + '/id/' + id).pipe(
      map(this.extractData));
  }

  updateFriendConnection(id:string, user1Id: string, user1ConnectionStrength: string, user2Id: string, connectionTags:string): void {
    const body = { "User1Id": user1Id, "User1ConnectionStrength": user1ConnectionStrength,
       "User2Id": user2Id, "Tag": connectionTags};
    this.httpClient.put(this.Url + '/updateFriendConnection/' +id, body).subscribe(r=>{});
  }

  getTagCloudAllConnections(): Observable<any> {
    return this.httpClient.get(this.Url + '/tagCloud/AllConnections').pipe(
      map(this.extractData));
  }

  getMyConnectionsTagCloud(id: string): Observable<any> {
    return this.httpClient.get(this.Url + '/tagCloud/Me/' +id).pipe(
      map(this.extractData));
  }

  getLeaderBoardStats(){
    return this.httpClient.get(this.Url + '/LeaderBoard/Stats').pipe(
      map(this.extractData));
  }
  getLeaderBoardFortress(){
    return this.httpClient.get(this.Url + '/LeaderBoard/Fortress').pipe(
      map(this.extractData));
  }

  updateConnectionRelationStrength(connectionId:string,userId:string,likeOrDislike:number){
    const body = {"UserId":userId, "LikeOrDislike":likeOrDislike}
    this.httpClient.put(this.Url + '/updateConnectionRelationStrength/' +connectionId, body).subscribe(r=>{});
  }
  deleteConnectionByUser(id:string) {
    return this.httpClient.delete(this.Url + '/delete/byUser/' + id).pipe(
      map(this.extractData));
  }
  private extractData(res: any) {
    return res || { };
  }

}
