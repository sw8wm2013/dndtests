import { List } from './list';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ListService {
  baseUri: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  apiUrl: string = '/list';

  constructor( private _http: HttpClient) { }

  createNewList(list: List): Observable<any>{
    console.log('CREATE NEW LIST INCOMING LIST', list);
    const url = `${this.baseUri}/create`;
    return this._http.post(url, list)
    .pipe(
      catchError(this.errorMgmt)
    )
    .pipe(
      map((data) => data as List)
    )
  }

  errorMgmt(error: HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage)
  }
  post(list: List) {
    return this._http.post(this.apiUrl, JSON.stringify(list)).pipe(
      map((data) => data as List)
    )

  }
}
