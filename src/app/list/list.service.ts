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

  getAllLists(): Observable<any>{
    console.log('getting the lists in the service');
    const url = `${this.baseUri}`;
    return this._http.get(url)
    .pipe(
      catchError(this.errorMgmt)
    )
    .pipe(
      map((data) => console.log('RETURNED LISTS', data))
    )
  }

  createNewList(list: List): Observable<any>{
    console.log('CREATE NEW LIST INCOMING LIST', list);
    const url = `${this.baseUri}/create`;
    return this._http.post(url, list)
    .pipe(
      catchError(this.errorMgmt)
    )
    .pipe(
      map((data) => data as List)
      // map((data) => console.log(data))

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
