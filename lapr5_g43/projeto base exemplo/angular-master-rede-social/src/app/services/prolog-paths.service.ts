import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrologPathsService {

  private Url = 'http://localhost:5002/'

  constructor(private httpClient: HttpClient) { }

  getShortPath(name1:string,name2:string){
    return this.httpClient.get(this.Url + 'shortPath?orig='+name1+"&dest="+name2).pipe(
      map(this.extractData));
  }

  getStrongPath(name1:string,name2:string){
    return this.httpClient.get(this.Url + 'strongPath?orig='+name1+"&dest="+name2).pipe(
      map(this.extractData));
  }

  getStrongPathWithRelationStrength(name1:string,name2:string){
    return this.httpClient.get(this.Url + 'strongPathPlus?orig='+name1+"&dest="+name2).pipe(
      map(this.extractData));
  }
  getSecurePath(name1:string,name2:string,value:number){
  return this.httpClient.get(this.Url + 'securePath?orig='+name1+"&dest="+name2+"&value="+value).pipe(
    map(this.extractData));
  }

  getSuggestUsers(name:string,level:number) {
    return this.httpClient.get(this.Url + 'suggestUsers?id='+name+'&level='+level).pipe(
      map(this.extractData));
  }

  getBestFirst(name1:string,name2:string,value:number){
    return this.httpClient.get(this.Url + 'bestFirst?orig='+name1+"&dest="+name2+"&value="+value).pipe(
      map(this.extractData));
  }
  getBestFirstWithEmotionalStates(name1:string,name2:string,value:number){
    return this.httpClient.get(this.Url + 'bestFirstWithEmotionalStates?orig='+name1+"&dest="+name2+"&value="+value).pipe(
      map(this.extractData));
  }

  importUsers(){
    return this.httpClient.get(this.Url + 'importUsers');
  }
  importUsersWithEmotionalStates(){
    return this.httpClient.get(this.Url + 'importUsersWithEmotionalStates');
  }
  importConnections(){
    return this.httpClient.get(this.Url + 'importConnections').pipe(
      map(this.extractData))
  }
  private extractData(res: any) {
    return res || { };
  }
}
