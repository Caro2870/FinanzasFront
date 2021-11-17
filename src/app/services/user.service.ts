import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  authURL = 'https://finanzasbricava.herokuapp.com/auth/';

  constructor(private http: HttpClient) { }
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
// API Error Handling
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }

  public getUserByUserName(userName: string){
    return this.http.get<any>(`${this.authURL}users/nombre/{nombre}/?nombre=${userName}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  public getUserById(id: number){
    return this.http.get<any>(`${this.authURL}${id}/users/`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
