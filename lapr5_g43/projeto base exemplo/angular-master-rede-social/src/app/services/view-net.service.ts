import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ViewNetService {

  Url = 'https://localhost:5001/api/net'

  constructor(
    private httpClient: HttpClient
  ) { }

  viewNetOfUserUpToLevel(id: string, level: number): Observable<any> {
    return this.httpClient.get(this.Url + '/viewNet/' +id +'/' +level).pipe(
      map(this.extractData));
  }

  private extractData(res: any) {
    return res || { };
  }
}
