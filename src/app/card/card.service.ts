import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError} from 'rxjs';
import { Card } from './card';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  baseUri = 'http://localhost:4000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  retriveAllCards (): Observable<any>{
    console.log('Retrieve all cards');
    const url = `${this.baseUri}/retrieveAllCards`;
    return this.http.get(url)
  }

  deleteCard(cardId: number): Observable<any>{
    const url = `${this.baseUri}/delete/${cardId}`;
    return this.http.delete(url, {headers:this.headers})
    .pipe(
      catchError(this.errorMgmt)
    )
    .pipe(
      map((data) => console.log('Deleted?', data))
    )
  }

  retrieveCardsByList(listId: number): Observable<any>{
    const url = `${this.baseUri}/reteriveCardsByList/${listId}`;
    return this.http.get(url, {headers: this.headers})
    .pipe(
      catchError(this.errorMgmt)
    )
    .pipe(
      map((data) => data as Card));
  }

  createNewCard(card: Card): Observable<any>{
    const url = `${this.baseUri}/createNewCard`;
    return this.http.post(url, card)
    .pipe(
      catchError(this.errorMgmt)
    )
    .pipe(
      map((data) => data as Card)
    );

  }

  errorMgmt(error: HttpErrorResponse){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
