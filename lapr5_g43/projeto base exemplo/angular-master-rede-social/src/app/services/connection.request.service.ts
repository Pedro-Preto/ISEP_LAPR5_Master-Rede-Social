import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// @ts-ignore
import { ConnectionRequest } from '../model/ConnectionRequest';

@Injectable({
  providedIn: 'root'
})
export class ConnectionRequestService {

  private Url = 'https://localhost:5001/api/connectionReq'

  constructor(private httpClient: HttpClient) { }

  getUserPendingConnections(id: string): Observable<any> {
    return this.httpClient.get(this.Url + '/pendingConnections/' +id).pipe(
      map(this.extractData));
  }

  createConnectionRequest(id: string, otherId: string): void {
    const body = { "User1Id": id, "User2Id": otherId };
    this.httpClient.post(this.Url + '/addConnectionRequestFromSuggested' ,body).subscribe(r=>{});
    console.log("Body: " +"User1Id: " +id  +", User2Id: " +otherId);
  }

  acceptConnectionRequest(id:string,strength:string,tag:string){
const body={"Id":id, "StrengthUserTarget":strength, "Tags":[tag], "ConnectionState":"Accepted"};
    return this.httpClient.put(this.Url + '/updateRequest',body )
      .pipe(map(this.extractData));
  }
  denyConnectionRequest(id:string){
    console.log(id);
    const body={"Id":id, "ConnectionState":"Denied"};
  return this.httpClient.put(this.Url + '/updateRequest',body)
      .pipe(map(this.extractData));
  }

  deleteConnectionRequestByUser(id:string) {
    return this.httpClient.delete(this.Url + '/delete/byUser/' + id).pipe(
      map(this.extractData));
  }

  private extractData(res: any) {
    return res || { };
  }
}
