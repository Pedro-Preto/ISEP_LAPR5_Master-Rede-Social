import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// @ts-ignore
import { IntroductionRequest } from '../model/IntroductionRequest';

@Injectable({
  providedIn: 'root'
})
export class IntroductionRequestService {

  private Url = 'https://localhost:5001/api/ir'

  constructor(private httpClient: HttpClient) { }

  getUserIntroductionRequests(id: string): Observable<any>{
    return this.httpClient.get(this.Url + '/user/' + id).pipe(
      map(this.extractData));
  }

  makeIntroductionRequest(idRequester:string,idIntermediary:string,idTarget:string,messageToIntermediary:string,messageToTarget:string,strength:string,tag:string){
    const body={
      "Date":"25 June 2021",
      "MessageToIntermediary":messageToIntermediary,
      "MessageToTarget":messageToTarget,
      "UserRequesterId":idRequester,
      "UserIntermediaryId":idIntermediary,
      "UserTargetId":idTarget,
      "State":"AwaitingApproval",
      "ConnectionStrength":strength,
      "TagList":[tag]
    };
    console.log(body);
    return this.httpClient.post(this.Url + '/addIntroductionRequest',body)
      .pipe(map(this.extractData)
      );
  }
  getUserPendingIntroductionRequests(id:string){
    return this.httpClient.get(this.Url + '/pendingIntro/' + id).pipe(
      map(this.extractData));

  }
  getById(id:string){
    return this.httpClient.get(this.Url + '/id/' + id).pipe(
      map(this.extractData));
  }
  updateIntroductionRequest(id:string,date: string, messageToIntermediary:string, messageToTarget:string, userRequesterId:string, userIntermediaryId:string, userTargetId:string, connectionStrength:string, tags:string,connectionState:string){
    const body = { "Date":date, "MessageToIntermediary":messageToIntermediary, "MessageToTarget":messageToTarget, "UserRequesterId":userRequesterId, "UserIntermediaryId":userIntermediaryId, "UserTargetId":userTargetId, "State":connectionState, "ConnectionStrength": connectionStrength,"TagList":[tags]};
  console.log(body);
    return this.httpClient.put(this.Url + '/update/' +id,body)
      .pipe(map(this.extractData)
      );
  }
  deleteIntroductionRequestByUser(id:string) {
    return this.httpClient.delete(this.Url + '/delete/byUser/' + id).pipe(
      map(this.extractData));
  }
  private extractData(res: any) {
    return res || { };
  }
}
