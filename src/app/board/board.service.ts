import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { List } from '../list/list';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BoardService {
  apiUrl: string = '/list';
  listsCache: List[] = [];

  constructor(private _http:HttpClient) { }

  getAll(){ return this._http.get(this.apiUrl).pipe(map(res => map((data) => data as List)}


}
