import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// @ts-ignore
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   Url = 'https://localhost:5001/api/user'
   netUrl = 'https://localhost:5001/api/net'

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any> {
    return this.httpClient.get(this.Url + '/getAll').pipe(
      map(this.extractData));
  }

  getUser(id: string): Observable<any> {
    return this.httpClient.get(this.Url + '/id/' +id).pipe(
      map(this.extractData));
  }

  getOtherUsers(id: string): Observable<any> {
    return this.httpClient.get(this.Url + '/getOther/' +id).pipe(
      map(this.extractData));
  }

  editProfile(userName: string, description: string, phoneNumber: string, address: string, tag: string, removeTag: string, id : string): Observable<any> {
    const body = { "UserName": userName, "Description": description, "PhoneNumber": phoneNumber, "Address": address, "Tag": tag, "RemoveTag": removeTag };
    return this.httpClient.put(this.Url + '/editProfile/id/' +id, body)
      .pipe(map(this.extractData)
      );
  }

  updateEmotionalState(id:string,emo:string){
    const body = { "EmotionalState": emo};
    return this.httpClient.put(this.Url + '/emotionalState/' +id,body)
      .pipe(map(this.extractData)
      );
  }
  registerUser(userName: string,birthday:string,emotionalState:string,gender:string,description: string, phoneNumber: string, address: string,email:string,psw:string,tags:string) {
    const body={"UserName":userName, "Birthday":birthday, "EmotionalState":emotionalState, "Gender":gender, "Description": description, "PhoneNumber":phoneNumber, "Address": address, "Email":email, "Password": psw, "Tags":[tags]};
    console.log(body);
    return this.httpClient.post(this.Url + '/registerUser',body)
      .pipe(map(this.extractData)
      );

  }

  logout(id:string) {
    console.log(id);
    const body={"UserId":id};
    return this.httpClient.put(this.Url + '/logout/',body )
      .pipe(map(this.extractData));
  }

   login(email:string,pass:string ){
    const body={"Email":email,"Pass":pass};
    console.log(body);
     return this.httpClient.put(this.Url + '/login',body )
       .pipe(map(this.extractData));
   }

   getIdByEmail(email:string){
     console.log(email);
     return this.httpClient.get(this.Url + '/idByEmail/'+email)
       .pipe(map(this.extractData));

   }
  getNetOfUserUpToLevel(id: string, level: number) {
    return this.httpClient.get(this.netUrl + '/viewNet/' +id +'/' +level)
      .pipe(map(this.extractData)
      );
  }

  getUserFriends(name:string){
   console.log(name);
    return this.httpClient.get(this.Url + '/GetFriends/'+name)
      .pipe(map(this.extractData));

  }

  getByKeyWord(name:string){
    return this.httpClient.get(this.Url + '/keyword/'+name)
      .pipe(map(this.extractData));
  }

  getTotalFirstLevelConnectionStrength(id:string): Observable<any> {
    return this.httpClient.get(this.Url + '/GetTotalFirstLevelConnectionStrength/'+id).pipe(
      map(this.extractData));
  }
  getTagCloudAllUsers(tagString:string): Observable<any> {
    return this.httpClient.get(this.Url + '/tagCloud/AllUsers/'+tagString).pipe(
      map(this.extractData));
  }
  getMyTagCloud(tags:string): Observable<any> {
    return this.httpClient.get(this.Url + '/tagCloud/Me/'+tags).pipe(
      map(this.extractData));
  }
  getUsersCommonFriends(name1:string,name2:string){
    return this.httpClient.get(this.Url + '/GetCommonFriends/'+name1+'/'+name2).pipe(
      map(this.extractData));
  }
  deleteUserById(id:string){
    return this.httpClient.delete(this.Url + '/delete/'+id).pipe(
      map(this.extractData));
  }

  getSuggestGroup(id:string,commonTagsNumber:number){
    return this.httpClient.get(this.Url + '/group/'+id+'/'+commonTagsNumber).pipe(
      map(this.extractData));
  }

  public extractData(res: any) {
    return res || { };
  }
}
